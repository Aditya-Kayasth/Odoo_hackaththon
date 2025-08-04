"use server";

import {
  passwordResetFormSchema,
  passwordResetFormSchemaType,
} from "@/schemas/PasswordResetFormClient";

import { getUserByEmail } from "@/lib/user";
import { getPasswordResetTokenByToken } from "@/lib/passwordReset";
import {db} from "@/lib/db";
import bcrypt from "bcryptjs";
import { success } from "zod";

async function PasswordFormReset(
  values: passwordResetFormSchemaType,
  token?: string | null
) {
  if (!token) {
    return { error: "Token Does not exist !!" };
  }
  const validateFields = passwordResetFormSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Password !" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid Token !!" };
  }

  const isExpired = new Date(existingToken.expiresAt) < new Date();

  if (isExpired) {
    return { error: "Password Reset Token is Expired!! " };
  }

  const user = await getUserByEmail(existingToken.email);

  if (!user) {
    return { error: "User does not exist! " };
  }

  const { password } = validateFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
        id: user.id
    },
    data:{
        password:hashedPassword,
        emailVerified: new Date(),
        email:existingToken.email

    }
  });

  await db.passwordReset.delete({
    where: {
        id:existingToken.id
    }
  })

  return {success: "Password reset successfully, You can continue to login"}

}

export default PasswordFormReset;
