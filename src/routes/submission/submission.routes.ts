import { FastifyInstance } from "fastify";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import authMiddleware from "../../middlewares/auth.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import { BaseResponseErrorSchema } from "../../types/response";
import AssignmentService from "../assignment/assignment.service";
import {
  CreateSubmissionInput,
  CreateSubmissionInputSchema,
} from "./dto/create_submission.input";
import { CreateSubmissionResponseSchema } from "./dto/create_submission.response";
import { SubmissionSchema } from "./schema/submission.schema";
import SubmissionController from "./submission.controller";
import SubmissionService from "./submission.service";
import { SubmissionContentSchema } from "./schema/submission_content.schema";

function submissionRoutes(fastify: FastifyInstance, opts: any) {
  fastify.addSchema(SubmissionSchema);
  fastify.addSchema(CreateSubmissionInputSchema);
  fastify.addSchema(SubmissionContentSchema);
  const submissionService = new SubmissionService(fastify.db);
  const assignmentService = new AssignmentService(fastify.db);
  const submissionController = new SubmissionController(
    submissionService,
    assignmentService,
  );

  fastify.post("/", {
    schema: {
      description: "Create submission",
      tags: ["submission"],
      body: CreateSubmissionInputSchema,
      response: {
        200: CreateSubmissionResponseSchema,
        500: BaseResponseErrorSchema,
      },
    },
    preHandler: [authMiddleware, roleMiddleware(["STUDENT"])],
    handler: async (
      request: FastifyRequest<{ Body: CreateSubmissionInput }>,
      _reply: FastifyReply,
    ) => await submissionController.createSubmission(request.body),
  });
}

export default submissionRoutes;
