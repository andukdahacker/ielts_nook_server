import { Static, Type } from "@sinclair/typebox";

export const SignInCenterInputSchema = Type.Object({
  idToken: Type.String(),
});

export type SignInCenterInput = Static<typeof SignInCenterInputSchema>;
