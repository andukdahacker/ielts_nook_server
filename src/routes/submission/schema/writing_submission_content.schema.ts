import { Static, Type } from "@sinclair/typebox";

export const WritingSubmissionContentSchema = Type.Object(
  {
    value: Type.String(),
  },
  { $id: "WritingSubmissionContent" },
);

export type WritingSubmissionContent = Static<
  typeof WritingSubmissionContentSchema
>;
