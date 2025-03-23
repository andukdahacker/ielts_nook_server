import { Static, Type } from "@sinclair/typebox";

export const GetAssignmentsByUserInputSchema = Type.Object({
  userId: Type.String(),
});

export type GetAssignmentsByUser = Static<
  typeof GetAssignmentsByUserInputSchema
>;
