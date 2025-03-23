import { Static, Type } from "@sinclair/typebox";
import { BaseResponseSchema } from "../../../types/response";
import { UserSchema } from "../../user/schema/user.schema";
import { AssignmentSchema } from "../schema/assignment.schema";

export const GetAssignmentsByExerciseResponseSchema = BaseResponseSchema(
  Type.Object({
    assignments: Type.Array(
      Type.Object({
        assignment: AssignmentSchema,
        user: UserSchema,
      }),
    ),
  }),
);

export type GetAssignmentsByExerciseResponse = Static<
  typeof GetAssignmentsByExerciseResponseSchema
>;
