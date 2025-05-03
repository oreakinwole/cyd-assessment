import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import type { JWT } from 'next-auth/jwt'
import type { Session } from 'next-auth'
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error('Missing credentials')
                }

                const { email, password } = credentials

                try {
                    const user = await prisma.users.findUnique({
                        where: { email },
                    })

                    if (!user) {
                        throw new Error('No user found')
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password!)

                    if (!passwordMatch) {
                        throw new Error('Incorrect password')
                    }

                    return {
                        id: user.id.toString(),
                        name: user.name!,
                        email: user.email!,
                        password: user.password,
                    }
                } catch (error) {
                    throw new Error('Error validating credentials', { cause: error })
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const validUser = await prisma.users.findUnique({
                    where: { email: user.email },
                })
                if (!validUser) {
                    throw new Error('No user found')
                }

                token = {
                    id: user.id.toString(),
                    name: user.name!,
                    email: user.email,
                }
            }

            return token
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            if (!session.user) {
                session.user = {}
            }
            session.user.id = token.id
            session.user.email = token.email
            return session
        },
    },

    session: {
        strategy: 'jwt',
    },

    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
