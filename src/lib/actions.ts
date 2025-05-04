'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

type RegisterUserParams = {
    name: string
    email: string
    password: string
}

export async function registerUser({ name, email, password }: RegisterUserParams) {
    console.log('Registering user:', { name, email, password })
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (existingUser) {
            return { error: 'User with this email already exists' }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        console.log('Hashed password:', hashedPassword)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        return { success: true, userId: user.id }
    } catch (error) {
        return { error: 'Failed to register user' }
    }
}
