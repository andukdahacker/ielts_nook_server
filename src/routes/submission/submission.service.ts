import { PrismaClient } from "@prisma/client";
import { CreateSubmissionInput } from "./dto/create_submission.input";

class SubmissionService {
  constructor(private readonly db: PrismaClient) {}

  async createSubmission(input: CreateSubmissionInput) {
    const submission = await this.db.submission.create({
      data: {
        assignmentId: input.assignmentId,
        content: input.content,
      },
    });

    return submission;
  }
}

export default SubmissionService;
