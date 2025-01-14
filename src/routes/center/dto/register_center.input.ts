import { Static, Type } from "@sinclair/typebox";

export const RegisterCenterInputSchema = Type.Object({
  email: Type.String(),
});

export type RegisterCenterInput = Static<typeof RegisterCenterInputSchema>;
