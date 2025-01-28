import { Static, Type } from "@sinclair/typebox";

export const ExerciseSchema = Type.Object(
  {
    id: Type.String(),
    title: Type.String(),
    content: Type.Any(),
    subTypeId: Type.String(),
    centerId: Type.String(),
    createdAt: Type.Any(),
    updatedAt: Type.Any(),
  },
  { $id: "Exercise" },
);

export type Exercise = Static<typeof ExerciseSchema>;
