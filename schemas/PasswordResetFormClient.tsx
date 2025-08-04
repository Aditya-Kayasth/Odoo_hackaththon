import { z } from "zod";

export const passwordResetFormSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Confirm Password must be at least 6 characters long" }),
}).refine((values) => values.password === values.confirmPassword,
    {
        message:"The passwords must match!",
        path:['confirmPassword'],
    }
);

export type passwordResetFormSchemaType = z.infer<
  typeof passwordResetFormSchema
>;
