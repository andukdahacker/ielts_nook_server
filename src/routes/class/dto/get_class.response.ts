import { Static, Type } from "@sinclair/typebox";
import { BaseResponseSchema } from "../../../types/response";
import { ClassSchema } from "../schema/class.schema";

export const GetClassResponseSchema = BaseResponseSchema(
  Type.Object({
    class: ClassSchema,
  }),
);

export type GetClassResponse = Static<typeof GetClassResponseSchema>;
