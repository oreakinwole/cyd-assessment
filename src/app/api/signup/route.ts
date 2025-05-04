import prisma from '@/lib/prisma'
import { validate } from '@/utils/validations'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        if (!body) {
            return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
        }

        const { email, name, password } = body

        const error = [
            validate(email, 'email', 'string'),
            validate(name, 'name', 'string'),
            validate(password, 'password', 'string'),
        ].filter(Boolean)

        if (error.length > 0) {
            return NextResponse.json({ error: 'Validation failed', details: error.join(', ') }, { status: 422 })
        }

        const existingUser = await prisma.users.findUnique({ where: { email } })

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists. Please sign in.' }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        let newUser = null

        try {
            newUser = await prisma.users.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                },
            })
        } catch (error) {
            console.error('Error creating user in Prisma:', error)
            return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
        }

        if (!newUser) {
            return NextResponse.json({ error: 'User creation failed' }, { status: 500 })
        }

        return NextResponse.json({ message: 'Signup successful!' }, { status: 201 })
    } catch (error) {
        console.error('Error during signup:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
