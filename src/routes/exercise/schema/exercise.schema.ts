import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "../../../types/nullable";

export const ExerciseSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String(),
    content: Type.Any(),
    subTypeId: Type.String(),
    centerId: Nullable(Type.String()),
    createdAt: Type.Any(),
    updatedAt: Type.Any(),
  },
  { $id: "Exercise" },
);

export type Exercise = Static<typeof ExerciseSchema>;
