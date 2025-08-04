import { z } from "zod";

export const PasswordResetSchema = z.object({
  email: z.string().email("Invalid email address"),

});

export type PasswordResetSchemaType = z.infer<typeof PasswordResetSchema>;
