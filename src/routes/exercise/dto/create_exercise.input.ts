import { Static, Type } from "@sinclair/typebox";

export const CreateExerciseInputSchema = Type.Object({
  subTypeId: Type.String(),
  name: Type.String(),
  content: Type.Any(),
});

export type CreateExerciseInput = Static<typeof CreateExerciseInputSchema>;
