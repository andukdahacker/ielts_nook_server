import AssignmentService from "../assignment/assignment.service";
import { CreateSubmissionInput } from "./dto/create_submission.input";
import { CreateSubmissionResponse } from "./dto/create_submission.response";
import SubmissionService from "./submission.service";

class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly assignmentService: AssignmentService,
  ) {}

  async createSubmission(
    input: CreateSubmissionInput,
  ): Promise<CreateSubmissionResponse> {
    const submission = await this.submissionService.createSubmission(input);

    await this.assignmentService.updateAssignment({
      id: submission.assignmentId,
      status: "SUBMITTED",
    });

    return {
      data: submission,
      message: "Created submission successfully",
    };
  }
}

export default SubmissionController;
