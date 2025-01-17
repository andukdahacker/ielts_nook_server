import { FastifyInstance } from "fastify";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import Env from "../../env";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import JwtService from "../../services/jwt.service";
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
import {
  SignInUserInput,
  SignInUserInputSchema,
} from "./dto/sign_in_user.input";
import { SignInUserResponseSchema } from "./dto/sign_in_user.response";
import {
  UpdateUserInput,
  UpdateUserInputSchema,
} from "./dto/update_user.input";
import { UpdateUserResponseSchema } from "./dto/update_user.response";
import UserController from "./user.controller";
import UserService from "./user.service";

async function userRoutes(fastify: FastifyInstance, opts: any) {
  const env = fastify.getEnvs<Env>();
  const userService = new UserService(fastify.db);
  const jwtService = new JwtService(env.JWT_SECRET);
  const userController = new UserController(userService, jwtService);

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

  fastify.put("/", {
    schema: {
      description: "Update a user",
      tags: ["user"],
      body: UpdateUserInputSchema,
      response: {
        200: UpdateUserResponseSchema,
        500: BaseResponseErrorSchema,
      },
    },
    preHandler: [authMiddleware, roleMiddleware(["ADMIN"])],
    handler: async (
      request: FastifyRequest<{ Body: UpdateUserInput }>,
      _reply: FastifyReply,
    ) => {},
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

  fastify.post("/signIn", {
    schema: {
      description: "Sign in a user",
      tags: ["user"],
      body: SignInUserInputSchema,
      response: {
        200: SignInUserResponseSchema,
        500: BaseResponseErrorSchema,
      },
    },
    handler: async (
      request: FastifyRequest<{ Body: SignInUserInput }>,
      _reply: FastifyReply,
    ) => userController.signIn(request.body),
  });
}

export default userRoutes;
