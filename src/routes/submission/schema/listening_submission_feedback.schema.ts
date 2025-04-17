import { Static, Type } from '@sinclair/typebox';

export const ListeningSubmissionFeedbackSchema = Type.Object({
    feedback: Type.String(),
});

export type ListeningSubmissionFeedback = Static<typeof ListeningSubmissionFeedbackSchema>;
