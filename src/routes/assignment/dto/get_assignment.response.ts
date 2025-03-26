import { Static, Type } from "@sinclair/typebox";
import { BaseResponseSchema } from "../../../types/response";
import { ExerciseSchema } from "../../exercise/schema/exercise.schema";
import { AssignmentSchema } from "../schema/assignment.schema";

export const GetAssignmentResponseSchema = BaseResponseSchema(
  Type.Object({
    assignment: AssignmentSchema,
    exercise: ExerciseSchema,
  }),
);

export type GetAssignmentResponse = Static<typeof GetAssignmentResponseSchema>;
