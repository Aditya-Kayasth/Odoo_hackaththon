import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./schemas/LoginSchema";
import { getUserByEmail } from "./lib/user";
import bcryptjs from "bcryptjs";
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,

    }),
    Google,

    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }

          const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
          );

          if (isPasswordCorrect) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
