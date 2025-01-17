import { Static, Type } from "@sinclair/typebox";

export const SignInUserInputSchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
});

export type SignInUserInput = Static<typeof SignInUserInputSchema>;
