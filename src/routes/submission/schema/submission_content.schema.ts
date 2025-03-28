import { Static, Type } from "@sinclair/typebox";
import { WritingSubmissionContentSchema } from "./writing_submission_content.schema";
import { ReadingSubmissionContentSchema } from "./reading_submission_content.schema";

export const SubmissionContentSchema = Type.Union(
  [WritingSubmissionContentSchema, ReadingSubmissionContentSchema],
  { $id: "SubmissionContent" },
);

export type SubmissionContentSchema = Static<typeof SubmissionContentSchema>;
