import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "./schemas/LoginSchema"
import { getUserByEmail } from "./lib/user"
import bcryptjs from "bcryptjs"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({

      async authorize(credentials){

        const validatedFields = loginSchema.safeParse(credentials)

        if (validatedFields.success){
          const {email,password } = validatedFields.data

          const user = await getUserByEmail(email)

          if (!user || !user.password){

            return null
          }

          const isPasswordCorrect = await bcryptjs.compare(password, user.password)

          if (isPasswordCorrect) return user;
        }
        
        return null
      }
    })
  ],
} satisfies NextAuthConfig