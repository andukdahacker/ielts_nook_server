import { NoDataResponse } from "../../types/response";
import AssignmentService from "./assignment.service";
import { CreateAssignmentsInput } from "./dto/create_assignments.input";
import { CreateAssignmentResponse } from "./dto/create_assignments.response";
import { DeleteAssignmentsInput } from "./dto/delete_assignments.input";
import { GetAssignmentsByExerciseResponse } from "./dto/get_assignments.response";
import { GetAssignmentsByExerciseInput } from "./dto/get_assignments_by_exercise.input";
import { UpdateAssignmentInput } from "./dto/update_assignments.input";
import { UpdateAssignmentsResponse } from "./dto/update_assignments.response";

class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  async createAssignments(
    input: CreateAssignmentsInput,
  ): Promise<CreateAssignmentResponse> {
    const assignments = await this.assignmentService.createAssigments(input);

    return {
      data: {
        assignments,
      },
      message: "",
    };
  }

  async getAssignmentsByExercise(
    input: GetAssignmentsByExerciseInput,
  ): Promise<GetAssignmentsByExerciseResponse> {
    const assignments =
      await this.assignmentService.getAssignmentsByExercise(input);

    const mapped = assignments.map((e) => {
      return {
        assignment: e,
        user: e.classMember.user,
      };
    });

    return {
      data: {
        assignments: mapped,
      },
      message: "Get assignments successfully",
    };
  }

  async updateAssignment(
    input: UpdateAssignmentInput,
  ): Promise<UpdateAssignmentsResponse> {
    const updated = await this.assignmentService.updateAssignment(input);

    return {
      data: updated,
      message: "Updated assignments successfully",
    };
  }

  async deleteAssignment(
    input: DeleteAssignmentsInput,
  ): Promise<NoDataResponse> {
    await this.assignmentService.deleteAssignment(input);

    return {
      message: "Deleted assignment successfully",
    };
  }
}

export default AssignmentController;
