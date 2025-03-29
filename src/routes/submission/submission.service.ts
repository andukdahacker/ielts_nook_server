import { PrismaClient } from "@prisma/client";
import { CreateSubmissionInput } from "./dto/create_submission.input";
import { GetSubmissionListInput } from "./dto/get_submission_list.input";
import { GetSubmissionInput } from "./dto/get_submission.input";

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

  async getSubmissions(input: GetSubmissionListInput, classIds: string[]) {
    const submissions = await this.db.submission.findMany({
      take: input.take,
      skip: input.cursor ? 1 : undefined,
      cursor: input.cursor ? { id: input.cursor } : undefined,
      where: {
        assignment: {
          OR: classIds.map((e) => ({
            classMemberClassId: e,
          })),
        },
      },
    });

    return submissions;
  }

  async getSubmission(input: GetSubmissionInput) {
    const submission = await this.db.submission.findUnique({
      where: {
        id: input.id,
      },
      include: {
        assignment: {
          include: {
            exercise: true,
          },
        },
      },
    });

    return submission;
  }
}

export default SubmissionService;
