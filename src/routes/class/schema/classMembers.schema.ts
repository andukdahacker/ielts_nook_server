import { Static, Type } from "@sinclair/typebox";
import { UserSchema } from "../../user/schema/user.schema";
import { ClassSchema } from "./class.schema";

export const ClassMemberSchema = Type.Object({
  classId: Type.String(),
  class: Type.Optional(ClassSchema),
  userId: Type.String(),
  user: Type.Optional(UserSchema),
});

export type ClassMember = Static<typeof ClassMemberSchema>;
