import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import { BaseResponseErrorSchema } from "../../types/response";
import ClassController from "./class.controller";
import ClassService from "./class.service";
import {
  CreateClassInput,
  CreateClassInputSchema,
} from "./dto/create_class.input";
import { CreateClassResponseSchema } from "./dto/create_class.response";
import { GetClassInput, GetClassInputSchema } from "./dto/get_class.input";
import { GetClassResponseSchema } from "./dto/get_class.response";
import {
  GetClassListInput,
  GetClassListInputSchema,
} from "./dto/get_class_list.input";
import { GetClassListResponseSchema } from "./dto/get_class_list.response";

async function classRoutes(fastify: FastifyInstance, opts: any) {
  fastify.addSchema(GetClassListInputSchema);
  const classService = new ClassService(fastify.db);
  const classController = new ClassController(classService);

  fastify.post("/", {
    schema: {
      description: "Create a class",
      tags: ["class"],
      body: CreateClassInputSchema,
      response: {
        200: CreateClassResponseSchema,
        500: BaseResponseErrorSchema,
      },
    },
    preHandler: [authMiddleware, roleMiddleware(["ADMIN"])],
    handler: async (
      request: FastifyRequest<{ Body: CreateClassInput }>,
      _reply: FastifyReply,
    ) => classController.createClass(request.body),
  });

  fastify.get("/:id", {
    schema: {
      description: "Get a class",
      tags: ["class"],
      params: GetClassInputSchema,
      response: {
        200: GetClassResponseSchema,
        500: BaseResponseErrorSchema,
      },
    },
    preHandler: [authMiddleware, roleMiddleware(["ADMIN", "TEACHER"])],
    handler: async (
      request: FastifyRequest<{ Params: GetClassInput }>,
      _reply: FastifyReply,
    ) => {},
  });

  fastify.get("/list", {
    schema: {
      description: "Get class list",
      tags: ["class"],
      querystring: GetClassListInputSchema,
      response: {
        200: GetClassListResponseSchema,
        500: BaseResponseErrorSchema,
      },
    },
    preHandler: [authMiddleware, roleMiddleware(["ADMIN"])],
    handler: async (
      request: FastifyRequest<{ Querystring: GetClassListInput }>,
      _reply: FastifyReply,
    ) => await classController.getClassList(request.query),
  });
}

export default classRoutes;
