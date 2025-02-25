import { NoDataResponse } from "../../types/response";
import { CreateExerciseInput } from "./dto/create_exercise.input";
import { CreateExerciseResponse } from "./dto/create_exercise.response";
import { DeleteExerciseInput } from "./dto/delete_exercise.input";
import { GetExerciseInput } from "./dto/get_exercise.input";
import { GetExerciseResponse } from "./dto/get_exercise.response";
import { GetExerciseListInput } from "./dto/get_exercise_list.input";
import { GetExerciseListResponse } from "./dto/get_exercise_list.response";
import { UpdateExerciseInput } from "./dto/update_exercise.input";
import { UpdateExerciseResponse } from "./dto/update_exercise.response";
import ExerciseService from "./exercise.service";

class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  async createExercise(
    input: CreateExerciseInput,
    centerId: string,
  ): Promise<CreateExerciseResponse> {
    const exercise = await this.exerciseService.createExercise(input, centerId);

    return {
      data: {
        exercise,
      },
      message: "Created exercise successfully",
    };
  }

  async updateExercise(
    input: UpdateExerciseInput,
    centerId: string,
  ): Promise<UpdateExerciseResponse> {
    const exercise = await this.exerciseService.getExercise(input);

    if (!exercise) {
      throw new Error("Cannot find exercise");
    }

    if (exercise?.centerId != centerId) {
      throw new Error("Unauthorized");
    }

    const updatedExercise = await this.exerciseService.updateExercise(input);

    return {
      data: updatedExercise,
      message: "Updated exercise successfully",
    };
  }

  async deleteExercise(
    input: DeleteExerciseInput,
    centerId: string,
  ): Promise<NoDataResponse> {
    const exercise = await this.exerciseService.getExercise(input);

    if (!exercise) {
      throw new Error("Cannot find exercise");
    }

    if (exercise?.centerId != centerId) {
      throw new Error("Unauthorized");
    }

    await this.exerciseService.deleteExercise(input);

    return {
      message: "Deleted exercise successfully",
    };
  }

  async getExercise(
    input: GetExerciseInput,
    centerId: string,
  ): Promise<GetExerciseResponse> {
    const exercise = await this.exerciseService.getExercise(input);

    if (!exercise) {
      throw new Error("Cannot find exercise");
    }

    if (exercise?.centerId != centerId) {
      throw new Error("Unauthorized");
    }

    return {
      data: {
        exercise,
      },
      message: "Get exercise successfully",
    };
  }

  async getExerciseList(
    input: GetExerciseListInput,
    centerId: string,
  ): Promise<GetExerciseListResponse> {
    const exercises = await this.exerciseService.getExerciseList(
      input,
      centerId,
    );

    if (exercises.length < input.take) {
      return {
        data: {
          nodes: exercises,
          pageInfo: {
            hasNextPage: false,
          },
        },
        message: "Get exercise list successfully",
      };
    }

    const cursor = exercises[exercises.length - 1].id;

    const nextCall = await this.exerciseService.getExerciseList(
      {
        ...input,
        cursor,
      },
      centerId,
    );

    if (nextCall.length == 0) {
      return {
        data: {
          nodes: exercises,
          pageInfo: {
            hasNextPage: false,
          },
        },
        message: "Get exercise list successfully",
      };
    }

    return {
      data: {
        nodes: exercises,
        pageInfo: {
          hasNextPage: true,
          cursor,
        },
      },
      message: "Get exercise list successfully",
    };
  }
}

export default ExerciseController;
