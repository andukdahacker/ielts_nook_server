import AssignmentService from "../assignment/assignment.service";
import ClassService from "../class/class.service";
import UserService from "../user/user.service";
import { CreateSubmissionInput } from "./dto/create_submission.input";
import { CreateSubmissionResponse } from "./dto/create_submission.response";
import { GetSubmissionInput } from "./dto/get_submission.input";
import { GetSubmissionResponse } from "./dto/get_submission.response";
import { GetSubmissionListInput } from "./dto/get_submission_list.input";
import { GetSubmissionListResponse } from "./dto/get_submission_list.response";
import SubmissionService from "./submission.service";

class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly assignmentService: AssignmentService,
    private readonly classMemberService: ClassService,
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

  async getSubmission(
    input: GetSubmissionInput,
  ): Promise<GetSubmissionResponse> {
    const submission = await this.submissionService.getSubmission(input);

    if (!submission) {
      throw new Error("Cannot find submission");
    }

    return {
      data: {
        submission: submission,
        exercise: submission.assignment.exercise,
        assignment: submission.assignment,
      },
      message: "Get submission successfully",
    };
  }

  async getSubmissions(
    input: GetSubmissionListInput,
    userId: string,
  ): Promise<GetSubmissionListResponse> {
    const classMember = await this.classMemberService.getClassByUserId(userId);

    const classIds = classMember.map((e) => e.classId);

    const submissions = await this.submissionService.getSubmissions(
      input,
      classIds,
    );

    if (submissions.length < input.take) {
      return {
        data: {
          nodes: submissions,
          pageInfo: {
            hasNextPage: false,
          },
        },
        message: "Get submissions successfully",
      };
    }

    const cursor = submissions[submissions.length - 1].id;

    const nextCall = await this.submissionService.getSubmissions(
      { ...input, cursor },
      classIds,
    );

    if (nextCall.length == 0) {
      return {
        data: {
          nodes: submissions,
          pageInfo: {
            hasNextPage: false,
          },
        },
        message: "Get submissions successfully",
      };
    }

    return {
      data: {
        nodes: submissions,
        pageInfo: {
          hasNextPage: true,
          cursor,
        },
      },
      message: "Get submissions successfully",
    };
  }
}

export default SubmissionController;
