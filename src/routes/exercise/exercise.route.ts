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
import ExerciseController from "./exercise.controller";
import ExerciseService from "./exercise.service";
import { ExerciseSchema } from "./schema/exercise.schema";
import { ExerciseTypeSchema } from "./schema/exercise_type.schema";
import {
  ReadingExerciseSchema,
  ReadingMultipleChoiceQuestionOptionSchema,
  ReadingMultipleChoiceQuestionSchema,
  ReadingMultipleChoiceTaskSchema,
  ReadingTFNGOptionSchema,
  ReadingTFNGQuestionSchema,
  ReadingTFNGTaskSchema,
  ReadingYNNGOptionSchema,
  ReadingYNNGQuestionSchema,
  ReadingYNNGTaskSchema,
} from "./schema/reading_exercise.schema";

async function exerciseRoutes(fastify: FastifyInstance, opts: any) {
  fastify.addSchema(ReadingMultipleChoiceQuestionOptionSchema);
  fastify.addSchema(ReadingMultipleChoiceQuestionSchema);
  fastify.addSchema(ReadingMultipleChoiceTaskSchema);
  fastify.addSchema(ReadingTFNGOptionSchema);
  fastify.addSchema(ReadingTFNGQuestionSchema);
  fastify.addSchema(ReadingTFNGTaskSchema);
  fastify.addSchema(ReadingYNNGOptionSchema);
  fastify.addSchema(ReadingYNNGQuestionSchema);
  fastify.addSchema(ReadingYNNGTaskSchema);
  fastify.addSchema(ReadingExerciseSchema);
  fastify.addSchema(ExerciseTypeSchema);
  fastify.addSchema(ExerciseSchema);
  fastify.addSchema(GetExerciseListInputSchema);
  fastify.addSchema(CreateExerciseInputSchema);

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
