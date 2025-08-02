"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import {
  generateEmailVerificationToken,
  sendVerificationEmail,
} from "@/lib/emailVerification";
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

  if (!user || !password || !email || !user.password) {
    return { error: "User does not exist!"};
  }

  if (!user.emailVerified) {
    const emailVerificationToken = await generateEmailVerificationToken(email);

    const { error } = await sendVerificationEmail(
      email,
      (await emailVerificationToken).token
    );

    if (error) {
      return { error: "Failed to send verification email" };
    }
    return { success: "Verification email sent!" };
  }

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
