import { Static, Type } from "@sinclair/typebox";
import { BaseResponseSchema } from "../../../types/response";
import { ExerciseSchema } from "../schema/exercise.schema";
import { ExerciseSubTypeSchema } from "../schema/exercise_sub_type.schema";

export const GetExerciseResponseSchema = BaseResponseSchema(
  Type.Object({
    exercise: ExerciseSchema,
    subType: ExerciseSubTypeSchema,
  }),
);

export type GetExerciseResponse = Static<typeof GetExerciseResponseSchema>;
