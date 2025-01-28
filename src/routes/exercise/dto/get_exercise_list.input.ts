import { Static, Type } from "@sinclair/typebox";
import { ExerciseTypeSchema } from "../schema/exercise_type.schema";

export const GetExerciseListInputSchema = Type.Object({
  take: Type.Number(),
  cursor: Type.Optional(Type.String()),
  type: ExerciseTypeSchema,
  subTypeIds: Type.Optional(Type.Array(Type.String())),
});

export type GetExerciseListInput = Static<typeof GetExerciseListInputSchema>;
