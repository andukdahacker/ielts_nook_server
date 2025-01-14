import { FastifyInstance } from "fastify";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import { BaseResponseErrorSchema } from "../../types/response";
import {
  CreateUserInput,
  CreateUserInputSchema,
} from "./dto/create_user.input";
import { CreateUserResponseSchema } from "./dto/create_user.response";
import {
  GetUserListInput,
  GetUserListInputSchema,
} from "./dto/get_user_list.input";
import { GetUserListResponseSchema } from "./dto/get_user_list.response";
import UserController from "./user.controller";
import UserService from "./user.service";

async function userRoutes(fastify: FastifyInstance, opts: any) {
  const userService = new UserService(fastify.db);
  const userController = new UserController(userService);

  fastify.post("/", {
    schema: {
      description: "Create a user",
      tags: ["user"],
      body: CreateUserInputSchema,
      response: {
        200: CreateUserResponseSchema,
        500: BaseResponseErrorSchema,
      },
    },
    preHandler: [authMiddleware, roleMiddleware(["ADMIN"])],
    handler: async (
      request: FastifyRequest<{ Body: CreateUserInput }>,
      _reply: FastifyReply,
    ) => await userController.createUser(request.body, request.jwtPayload),
  });

  fastify.get("/list", {
    schema: {
      description: "Get list of users",
      tags: ["user"],
      querystring: GetUserListInputSchema,
      response: {
        200: GetUserListResponseSchema,
        500: BaseResponseErrorSchema,
      },
    },
    preHandler: [authMiddleware, roleMiddleware(["ADMIN"])],
    handler: async (
      request: FastifyRequest<{ Querystring: GetUserListInput }>,
      _reply: FastifyReply,
    ) => await userController.getUserList(request.query, request.jwtPayload),
  });
}

export default userRoutes;
