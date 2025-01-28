import { Static, Type } from "@sinclair/typebox";
import { ExerciseTypeSchema } from "../schema/exercise_type.schema";

export const GetExerciseSubTypeListInputSchema = Type.Object({
  type: ExerciseTypeSchema,
});

export type GetExerciseSubTypeListInput = Static<
  typeof GetExerciseSubTypeListInputSchema
>;
