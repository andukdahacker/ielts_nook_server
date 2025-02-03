import { Static, Type } from "@sinclair/typebox";

export const ReadingQuestionOptionSchema = Type.Object(
  {
    content: Type.String(),
    order: Type.Number(),
    value: Type.String(),
  },
  { $id: "ReadingQuestionOption" },
);

export type ReadingQuestionOption = Static<typeof ReadingQuestionOptionSchema>;

export const ReadingExerciseQuestionSchema = Type.Object(
  {
    content: Type.String(),
    correctAnswer: Type.String(),
    order: Type.Number(),
    options: Type.Array(ReadingQuestionOptionSchema),
  },
  { $id: "ReadingExerciseQuestion" },
);

export type ReadingExerciseQuestion = Static<
  typeof ReadingExerciseQuestionSchema
>;

export const ReadingExerciseTaskSchema = Type.Object(
  {
    instructions: Type.String(),
    questions: Type.Array(ReadingExerciseQuestionSchema),
  },
  { $id: "ReadingExerciseTask" },
);

export type ReadingExerciseTask = Static<typeof ReadingExerciseTaskSchema>;

export const ReadingExerciseSchema = Type.Object(
  {
    title: Type.String(),
    content: Type.String(),
    tasks: Type.Array(ReadingExerciseTaskSchema),
  },
  { $id: "ReadingExercise" },
);

export const ReadingExerciseTypeSchema = Type.Union(
  [Type.Literal("Multiple choice"), Type.Literal("True/False/Not Given")],
  { $id: "ReadingExerciseType" },
);

export const ListeningExerciseTypeSchema = Type.Union([
  Type.Literal("Multiple choice"),
]);

export type ReadingExercise = Static<typeof ReadingExerciseSchema>;
