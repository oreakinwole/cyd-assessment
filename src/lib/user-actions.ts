'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function fetchUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        })
        return users
    } catch (error) {
        console.error('Failed to fetch users:', error)
        throw new Error('Failed to fetch users')
    }
}

export async function createUser({ name, email, password }: { name: string; email: string; password: string }) {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (existingUser) {
            throw new Error('User with this email already exists')
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create the user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        return { success: true, userId: user.id }
    } catch (error) {
        console.error('Failed to create user:', error)
        throw error
    }
}

export async function updateUser({ id, name, email, password }: { id: string; name: string; email: string; password?: string }) {
    try {
        // Check if email is already taken by another user
        const existingUser = await prisma.user.findFirst({
            where: {
                email,
                NOT: {
                    id,
                },
            },
        })

        if (existingUser) {
            throw new Error('Email is already taken by another user')
        }

        const updateData: any = {
            name,
            email,
        }

        // Only update password if provided
        if (password) {
            updateData.password = await bcrypt.hash(password, 10)
        }

        // Update the user
        await prisma.user.update({
            where: {
                id,
            },
            data: updateData,
        })

        return { success: true }
    } catch (error) {
        console.error('Failed to update user:', error)
        throw error
    }
}

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({
            where: {
                id,
            },
        })

        return { success: true }
    } catch (error) {
        console.error('Failed to delete user:', error)
        throw new Error('Failed to delete user')
    }
}
