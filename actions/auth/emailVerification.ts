"use server"
import {db} from "@/lib/db"
import { getUserByEmail } from "@/lib/user"

export const verifyEmail = async (token: string) => {

    // Find the email verification token
    const verificationEmailTocken = await db.emailVerification.findUnique({
        where:{
            token:token
        }
    })

    if (!verificationEmailTocken) return {error: "The verificatoin code does not exist!"}

    // Check if the token is expired

    const isexpired =  new Date(verificationEmailTocken.expiresAt) < new Date()

    if (isexpired) return {error: "The token is expired!"}

    // Check if the user exists
    const existingUser = await getUserByEmail(verificationEmailTocken.email)

    if (!existingUser) return {error: "The user does not exist!! "}

    // Update the user's email verification status
    await db.user.update({
        where:{ id: existingUser.id},
        data:{ emailVerified: new Date(), email: verificationEmailTocken.email },
    })

    return {success: "Email verified successfully"};
}