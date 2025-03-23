import { Static, Type } from "@sinclair/typebox";

export const UpdateAssignmentInputSchema = Type.Object({
  id: Type.String(),
  title: Type.Optional(Type.String()),
  dueDate: Type.Optional(Type.Any()),
});

export type UpdateAssignmentInput = Static<typeof UpdateAssignmentInputSchema>;
