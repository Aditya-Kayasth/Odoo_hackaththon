"use server";

import {
  PasswordResetSchemaType,
  PasswordResetSchema,
} from "@/schemas/PasswordResetSchema";
import {
  generatePasswordResetToken,
  getPasswordResetTokenByEmail,
} from "@/lib/passwordReset";
import { getUserByEmail } from "@/lib/user";
import { sendPasswordResetEmail } from "@/lib/passwordReset";


async function PasswordReset(values: PasswordResetSchemaType) {
  const validateFields = PasswordResetSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Email !" };
  }

  const { email } = validateFields.data;

  const user = await getUserByEmail(email);

  if (!user || !user.email) {
    return { error: "User does not exist!" };
  }

  const resetPasswordToken = await generatePasswordResetToken(email);

  const { error } = await sendPasswordResetEmail(
    resetPasswordToken.email,
    resetPasswordToken.token
  );


  if (error) {
    return {
      error: "Something went wrong while sending the password rest email !",
    };
  }

  return { success: "Password reset email sent!" };
}

export default PasswordReset;
