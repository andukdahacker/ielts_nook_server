import { Static, Type } from "@sinclair/typebox";
import { Nullable } from "../../../types/nullable";

export const AssignmentSchema = Type.Object(
  {
    id: Type.String(),
    title: Type.String(),
    dueDate: Nullable(Type.Any()),
    classMemberClassId: Type.String(),
    classMemberUserId: Type.String(),
    exerciseId: Type.String(),
    createdAt: Type.Any(),
    updatedAt: Type.Any(),
  },
  { $id: "Assignment" },
);

export type Assignment = Static<typeof AssignmentSchema>;
