import { PrismaClient } from "@prisma/client";
import { CreateAssignmentsInput } from "./dto/create_assignments.input";
import { DeleteAssignmentsInput } from "./dto/delete_assignments.input";
import { GetAssignmentsByExerciseInput } from "./dto/get_assignments_by_exercise.input";
import { UpdateAssignmentInput } from "./dto/update_assignments.input";

class AssignmentService {
  constructor(private readonly db: PrismaClient) {}

  async getAssignmentsByExercise(input: GetAssignmentsByExerciseInput) {
    const assignments = await this.db.assignment.findMany({
      where: {
        exerciseId: input.exerciseId,
      },
      include: {
        classMember: {
          include: {
            user: true,
            class: true,
          },
        },
      },
    });

    return assignments;
  }

  async createAssigments(input: CreateAssignmentsInput) {
    return await this.db.assignment.createManyAndReturn({
      data: input.students.map((e) => {
        return {
          title: input.title,
          dueDate: input.dueDate,
          exerciseId: input.exerciseId,
          classMemberClassId: e.classId,
          classMemberUserId: e.userId,
        };
      }),
    });
  }

  async updateAssignment(input: UpdateAssignmentInput) {
    const updated = await this.db.assignment.update({
      where: {
        id: input.id,
      },
      data: {
        dueDate: input.dueDate,
        title: input.title,
      },
    });

    return updated;
  }

  async deleteAssignment(input: DeleteAssignmentsInput) {
    await this.db.assignment.delete({
      where: {
        id: input.id,
      },
    });
  }
}

export default AssignmentService;
