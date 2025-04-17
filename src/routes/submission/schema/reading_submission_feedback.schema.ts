import { Static, Type } from '@sinclair/typebox';

export const ReadingSubmissionFeedbackSchema = Type.Object({
    feedback: Type.String(),
});

export type ReadingSubmissionFeedback = Static<typeof ReadingSubmissionFeedbackSchema>;
