import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import { parseArgs } from "node:util";
import {
  ReadingExercise,
  ReadingExerciseTask,
} from "../src/routes/exercise/schema/reading_exercise.schema";

async function seed() {
  const {
    values: { centerId },
  } = parseArgs({ options: { centerId: { type: "string" } } });
  const prisma = new PrismaClient();

  const hashed = await argon2.hash("Ducdeptraino1@");
  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        email: `user${i}@gmail.com`,
        password: hashed,
        role: "STUDENT",
        center: {
          connect: {
            id: centerId,
          },
        },
        firstName: "User",
        lastName: `${i}`,
      },
    });
  }

  const subtype = await prisma.exerciseSubType.create({
    data: {
      exerciseType: "READING",
      name: "Multiple choice",
      description:
        "Candidates choose the correct answer from three or four options",
    },
  });

  const task: ReadingExerciseTask = {
    instructions: "Write the correct letter in boxes 1-3 on your answer sheet",
    questions: [
      {
        content:
          "What does the writer say about the performance of older typists on the test",
        correctAnswer: "A",
        order: 1,
        options: [
          {
            order: 1,
            content: "They used different motor skills from younger typists.",
            value: "A",
          },
          {
            order: 2,
            content:
              "They had been more efficiently trained than younger typists.",
            value: "B",
          },
          {
            order: 3,
            content:
              "They used more time-saving techniques than younger typists.",
            value: "C",
          },
          {
            order: 4,
            content:
              "They had better concentration skills than younger typists.",
            value: "D",
          },
        ],
      },
    ],
  };

  const readingExercise: ReadingExercise = {
    content: "This is the reading material",
    tasks: [task],
    title: "First reading exercise",
  };

  const exercise = await prisma.exercise.create({
    data: {
      name: "Ancient Rome",
      content: JSON.stringify(readingExercise),
      subType: {
        connect: {
          id: subtype.id,
        },
      },
      center: {
        connect: {
          id: centerId,
        },
      },
    },
  });
}

seed()
  .then(() => console.log("Seeding done"))
  .catch((error) => console.log("Error seeding: ", error));
