import { Static } from "@sinclair/typebox";
import { PaginatedBaseReponseSchema } from "../../../types/response";
import { UserSchema } from "../schema/user.schema";

export const GetUserListResponseSchema = PaginatedBaseReponseSchema(UserSchema);

export type GetUserListResponse = Static<typeof GetUserListResponseSchema>;
