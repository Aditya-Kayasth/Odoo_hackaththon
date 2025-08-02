import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationTocken = await db.emailVerification.findFirst({
      where: {
        email: email,
      },
    });

    return verificationTocken;
  } catch (error) {
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.emailVerification.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 36000 * 1000);
  
  const newToken = await db.emailVerification.create({
    data: { email, token, expiresAt: expires },
  });
  return newToken;
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const linkToVerify = `${process.env.BASE_URL}/emailVerification?token=${token}`;

  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Email Verification",
    html: `<p>Click <a href = ${linkToVerify}>here</a> to verify </p>`,
  });

  return { error: res.error };
};
