import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "../../../types/nullable";
import { ExerciseTypeSchema } from "./exercise_type.schema";

export const ExerciseSubTypeSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String(),
    description: Nullable(Type.String()),
    exerciseType: ExerciseTypeSchema,
    createdAt: Type.Any(),
    updatedAt: Type.Any(),
  },
  { $id: "ExerciseSubType" },
);

export type ExerciseSubType = Static<typeof ExerciseSubTypeSchema>;
