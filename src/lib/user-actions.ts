'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { UserRole, UserStatus } from '@prisma/client'

export type PaginationParams = {
    page: number
    limit: number
    search?: string
    role?: UserRole
    status?: UserStatus
}

export async function fetchUsers(params?: PaginationParams) {
    try {
        const { page = 1, limit = 10, search = '', role, status } = params || {}
        const skip = (page - 1) * limit

        // Create search filter
        const where: any = {}

        // Add search filter if search term is provided
        if (search) {
            where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }]
        }

        // Add role filter if provided
        if (role) {
            where.role = role
        }

        // Add status filter if provided
        if (status) {
            where.status = status
        }

        // Get total count for pagination
        const total = await prisma.user.count({ where })

        // Fetch users with pagination and filters
        const users = await prisma.user.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
            },
            skip,
            take: limit,
        })

        return {
            users,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        }
    } catch (error) {
        console.error('Failed to fetch users:', error)
        throw new Error('Failed to fetch users')
    }
}

export async function createUser({
    name,
    email,
    password,
    role = UserRole.USER,
    status = UserStatus.ACTIVE,
}: {
    name: string
    email: string
    password: string
    role?: UserRole
    status?: UserStatus
}) {
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
                role,
                status,
            },
        })

        return { success: true, userId: user.id }
    } catch (error) {
        console.error('Failed to create user:', error)
        throw error
    }
}

export async function updateUser({
    id,
    name,
    email,
    password,
    role,
    status,
}: {
    id: string
    name: string
    email: string
    password?: string
    role?: UserRole
    status?: UserStatus
}) {
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

        // Update role if provided
        if (role) {
            updateData.role = role
        }

        // Update status if provided
        if (status) {
            updateData.status = status
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
