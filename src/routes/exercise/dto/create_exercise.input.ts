import { Static, Type } from "@sinclair/typebox";

export const CreateExerciseInputSchema = Type.Object({
  subTypeId: Type.String(),
  title: Type.String(),
  content: Type.Any(),
});

export type CreateExerciseInput = Static<typeof CreateExerciseInputSchema>;
