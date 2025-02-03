import { FastifyInstance } from "fastify";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import {
  BaseResponseErrorSchema,
  NoDataResponseSchema,
} from "../../types/response";
import {
  CreateExerciseInput,
  CreateExerciseInputSchema,
} from "./dto/create_exercise.input";
import { CreateExerciseResponseSchema } from "./dto/create_exercise.response";
import {
  DeleteExerciseInput,
  DeleteExerciseInputSchema,
} from "./dto/delete_exercise.input";
import {
  GetExerciseInput,
  GetExerciseInputSchema,
} from "./dto/get_exercise.input";
import { GetExerciseResponseSchema } from "./dto/get_exercise.response";
import {
  GetExerciseListInput,
  GetExerciseListInputSchema,
} from "./dto/get_exercise_list.input";
import { GetExerciseListResponseSchema } from "./dto/get_exercise_list.response";
import {
  GetExerciseSubTypeListInput,
  GetExerciseSubTypeListInputSchema,
} from "./dto/get_exercise_sub_type_list.input";
import { GetExerciseSubTypeListResponseSchema } from "./dto/get_exercise_sub_type_list.response";
import ExerciseController from "./exercise.controller";
import ExerciseService from "./exercise.service";
import { ExerciseSchema } from "./schema/exercise.schema";
import { ExerciseSubTypeSchema } from "./schema/exercise_sub_type.schema";
import { ExerciseTypeSchema } from "./schema/exercise_type.schema";
import {
  ReadingExerciseQuestionSchema,
  ReadingExerciseSchema,
  ReadingExerciseTaskSchema,
  ReadingExerciseTypeSchema,
  ReadingQuestionOptionSchema,
} from "./schema/reading_exercise.schema";

async function exerciseRoutes(fastify: FastifyInstance, opts: any) {
  fastify.addSchema(ReadingQuestionOptionSchema);
  fastify.addSchema(ReadingExerciseQuestionSchema);
  fastify.addSchema(ReadingExerciseTaskSchema);
  fastify.addSchema(ReadingExerciseSchema);
  fastify.addSchema(ReadingExerciseTypeSchema);
  fastify.addSchema(ExerciseTypeSchema);
  fastify.addSchema(ExerciseSchema);
  fastify.addSchema(ExerciseSubTypeSchema);
  fastify.addSchema(GetExerciseListInputSchema);

  const exerciseService = new ExerciseService(fastify.db);
  const exerciseController = new ExerciseController(exerciseService);

  fastify.post("/", {
    schema: {
      description: "Create an exercise",
      tags: ["exercise"],
      body: CreateExerciseInputSchema,
      response: {
        200: CreateExerciseResponseSchema,
        500: BaseResponseErrorSchema,
      },
    },
    preHandler: [authMiddleware, roleMiddleware(["ADMIN", "TEACHER"])],
    handler: async (
      request: FastifyRequest<{ Body: CreateExerciseInput }>,
      _reply: FastifyReply,
    ) =>
      exerciseController.createExercise(
        request.body,
        request.jwtPayload.centerId,
      ),
  });

  fastify.delete("/:id", {
    schema: {
      description: "Delete an exercise",
      tags: ["exercise"],
      params: DeleteExerciseInputSchema,
      response: {
        200: NoDataResponseSchema,
        500: BaseResponseErrorSchema,
      },
    },
    preHandler: [authMiddleware, roleMiddleware(["ADMIN", "TEACHER"])],
    handler: async (
      request: FastifyRequest<{ Params: DeleteExerciseInput }>,
      _reply: FastifyReply,
    ) =>
      exerciseController.deleteExercise(
        request.params,
        request.jwtPayload.centerId,
      ),
  });

  fastify.get("/:id", {
    schema: {
      description: "Get an exercise with id",
      tags: ["exercise"],
      params: GetExerciseInputSchema,
      response: {
        200: GetExerciseResponseSchema,
        500: BaseResponseErrorSchema,
      },
    },
    preHandler: [authMiddleware],
    handler: async (
      request: FastifyRequest<{ Params: GetExerciseInput }>,
      _reply: FastifyReply,
    ) =>
      exerciseController.getExercise(
        request.params,
        request.jwtPayload.centerId,
      ),
  });

  fastify.get("/subtype/list", {
    schema: {
      description: "Get list of exercises sub types",
      tags: ["exercise"],
      querystring: GetExerciseSubTypeListInputSchema,
      response: {
        200: GetExerciseSubTypeListResponseSchema,
        500: BaseResponseErrorSchema,
      },
    },
    preHandler: [authMiddleware],
    handler: async (
      request: FastifyRequest<{ Querystring: GetExerciseSubTypeListInput }>,
      _reply: FastifyReply,
    ) => exerciseController.getExerciseSubTypeList(request.query),
  });

  fastify.get("/list", {
    schema: {
      description: "Get list of exercises",
      tags: ["exercise"],
      querystring: GetExerciseListInputSchema,
      response: {
        200: GetExerciseListResponseSchema,
        500: BaseResponseErrorSchema,
      },
    },
    preHandler: [authMiddleware],
    handler: async (
      request: FastifyRequest<{ Querystring: GetExerciseListInput }>,
      _reply: FastifyReply,
    ) =>
      exerciseController.getExerciseList(
        request.query,
        request.jwtPayload.centerId,
      ),
  });
}

export default exerciseRoutes;
