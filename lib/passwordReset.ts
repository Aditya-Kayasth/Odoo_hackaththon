import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordReset.findFirst({
      where: {
        email: email,
      },
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordReset.findUnique({
      where: {
        token: token,
      },
    });

    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 36000 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordReset.delete({
      where: {
        id: existingToken.id,
      },
    });
  }


  
  const newToken = await db.passwordReset.create({
    data: { email, token, expiresAt: expires },
  });
  return newToken;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {

  const resend = new Resend(process.env.RESEND_API_KEY);

  const linkToReset = `${process.env.BASE_URL}/passwordResetForm?token=${token}`;

  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href = ${linkToReset}>here</a> to Reset your password</p>`,
  }); 

  return { error: res.error };
};
