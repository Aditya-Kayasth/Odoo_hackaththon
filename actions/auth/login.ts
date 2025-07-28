"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/user";
import { Loginredirect } from "@/routes";
import { LoginSchemaType, loginSchema } from "@/schemas/LoginSchema";
import { AuthError } from "next-auth";

async function logIn(values: LoginSchemaType) {
  const validateFields = loginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid field" };
  }

  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);

  // const pass = user?.password

  // if (user && user.password) {
  //     return {success: "User logged in successfully!", email,pass};
  // }
  if (!user || !password || !email || !user.password) {
    return { error: "Invalid Credentials 1" };
  }

  // if (!user.emailVerified){
  //     return {error: "Email not verified!"};
  // }

  try {
    await signIn("credentials", { email, password, redirectTo: Loginredirect });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials! 2" };
        default:
          return { error: "Something went wrong" };
      }
    }
  }
}

export default logIn;
