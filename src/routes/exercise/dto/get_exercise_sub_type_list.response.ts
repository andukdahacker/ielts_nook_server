import { Static, Type } from "@sinclair/typebox";
import { BaseResponseSchema } from "../../../types/response";
import { ExerciseSubTypeSchema } from "../schema/exercise_sub_type.schema";

export const GetExerciseSubTypeListResponseSchema = BaseResponseSchema(
  Type.Object({
    exerciseSubTypes: Type.Array(ExerciseSubTypeSchema),
  }),
);

export type GetExerciseSubTypeListResponse = Static<
  typeof GetExerciseSubTypeListResponseSchema
>;
