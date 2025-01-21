import { Static } from "@sinclair/typebox";
import { PaginatedBaseReponseSchema } from "../../../types/response";
import { ClassSchema } from "../schema/class.schema";

export const GetClassListResponseSchema =
  PaginatedBaseReponseSchema(ClassSchema);

export type GetClassListResponse = Static<typeof GetClassListResponseSchema>;
