'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

type RegisterUserParams = {
    name: string
    email: string
    password: string
}

export async function registerUser({ name, email, password }: RegisterUserParams) {
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

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        return { success: true, userId: user.id }
    } catch (error) {
        console.error('Error registering user:', error)
        return { error: 'Failed to register user' }
    }
}
