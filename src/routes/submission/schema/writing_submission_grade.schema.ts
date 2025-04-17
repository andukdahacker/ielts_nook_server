import { Static, Type } from '@sinclair/typebox';

export const WritingSubmissionGradeSchema = Type.Object(
    {
        taskAchievement: Type.Number(),
        coherenceAndCohesion: Type.Number(),
        lexicalResource: Type.Number(),
        grammaticalRangeAndAccuracy: Type.Number(),
    },
    { $id: 'WritingSubmissionGrade' },
);

export type WritingSubmissionGrade = Static<typeof WritingSubmissionGradeSchema>;
