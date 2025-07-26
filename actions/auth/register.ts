"use server"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/lib/user"
import { registerSchema, RegisterSchemaType } from "@/schemas/RegisterSchema"

import bcrypt from "bcryptjs"
import { success } from "zod"

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

    return {success: "User Created!"}
}

export default signUp;