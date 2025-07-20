import {z} from "zod";

export const registerSchema = z.object(
    {
        name: z.string().min(3, {message: "name must be 4 or more characters long"}).max(30,{message: "name must be less than 30 characters long"}),
        email: z.string().email("Invalid email address") ,
        password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
        confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters long" }),


}).refine((values) => values.password === values.confirmPassword,
    {
        message:"The passwords must match!",
        path:['confirmPassword'],
    }
)

export type RegisterSchemaType = z.infer<typeof registerSchema>;