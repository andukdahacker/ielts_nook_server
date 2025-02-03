import { Static, Type } from "@sinclair/typebox";
import { PaginatedBaseReponseSchema } from "../../../types/response";
import { ExerciseSchema } from "../schema/exercise.schema";
import { ExerciseSubTypeSchema } from "../schema/exercise_sub_type.schema";

export const GetExerciseListResponseSchema = PaginatedBaseReponseSchema(
  Type.Object({ subType: ExerciseSubTypeSchema, exercise: ExerciseSchema }),
);

export type GetExerciseListResponse = Static<
  typeof GetExerciseListResponseSchema
>;
