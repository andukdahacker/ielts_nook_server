import { PrismaClient } from "@prisma/client";
import { CreateExerciseInput } from "./dto/create_exercise.input";
import { DeleteExerciseInput } from "./dto/delete_exercise.input";
import { GetExerciseInput } from "./dto/get_exercise.input";
import { GetExerciseListInput } from "./dto/get_exercise_list.input";
import { GetExerciseSubTypeListInput } from "./dto/get_exercise_sub_type_list.input";

class ExerciseService {
  constructor(private readonly db: PrismaClient) {}

  async createExercise(input: CreateExerciseInput, centerId: string) {
    const { name, content, subTypeId } = input;
    const exercise = await this.db.exercise.create({
      data: {
        name,
        content,
        subType: {
          connect: {
            id: subTypeId,
          },
        },
        center: {
          connect: {
            id: centerId,
          },
        },
      },
    });

    return exercise;
  }

  async deleteExercise(input: DeleteExerciseInput) {
    await this.db.exercise.delete({ where: { id: input.id } });
  }

  async getExercise(input: GetExerciseInput) {
    const exercise = await this.db.exercise.findUnique({
      where: {
        id: input.id,
      },
      include: {
        subType: true,
      },
    });

    return exercise;
  }

  async getExerciseSubTypeList(input: GetExerciseSubTypeListInput) {
    const subTypes = await this.db.exerciseSubType.findMany({
      where: {
        exerciseType: input.type,
      },
    });

    return subTypes;
  }

  async getExerciseList(input: GetExerciseListInput, centerId: string) {
    const { cursor, take, type, subTypeIds, isPublic, searchString } = input;

    const exercises = await this.db.exercise.findMany({
      take,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : undefined,
      where: {
        centerId: isPublic ? undefined : centerId,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            subType: {
              exerciseType: type,
            },
          },
          {
            subTypeId: subTypeIds
              ? {
                  in: subTypeIds,
                }
              : undefined,
          },
        ],
      },
      include: {
        subType: true,
      },
    });

    return exercises;
  }
}

export default ExerciseService;
