import { Static, Type } from "@sinclair/typebox";
import { BaseResponseSchema } from "../../../types/response";
import { ExerciseSchema } from "../schema/exercise.schema";

export const CreateExerciseResponseSchema = BaseResponseSchema(
  Type.Object({
    exercise: ExerciseSchema,
  }),
);

export type CreateExerciseResponse = Static<
  typeof CreateExerciseResponseSchema
>;
