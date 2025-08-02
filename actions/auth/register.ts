"use server"

import { db } from "@/lib/db"
import {generateEmailVerificationToken,sendVerificationEmail} from "@/lib/emailVerification"
import { getUserByEmail } from "@/lib/user"
import { registerSchema, RegisterSchemaType } from "@/schemas/RegisterSchema"

import bcrypt from "bcryptjs"


async function signUp(values:RegisterSchemaType) {
    
    const validateFields = registerSchema.safeParse(values)

    if(!validateFields.success){
        return {error: "Invalid field"}
    }

    const {name, email, password} = validateFields.data


    const user = await getUserByEmail(email)

    if (user){
        return {error: "Email already in use! "}
    }

    const hashedPassword = await bcrypt.hash(password,10)

    await db.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        }
    })

    const emailVerificationToken = generateEmailVerificationToken(email)

    const {error} = await sendVerificationEmail(email,(await emailVerificationToken).token)

    if (error) {
        return {error: "Failed to send verification email"}
    }
    return {success: "Verification email sent!"}
}

export default signUp;