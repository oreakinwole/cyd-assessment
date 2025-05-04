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
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error('Missing credentials')
                }

                const user = await prisma.users.findUnique({
                    where: { email: credentials.email },
                })

                if (!user) {
                    throw new Error('No user found')
                }

                const isValid = await bcrypt.compare(credentials.password, user.password!)
                if (!isValid) {
                    throw new Error('Incorrect password')
                }

                return {
                    id: user.id.toString(),
                    name: user.name!,
                    email: user.email!,
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
            }
            return token
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            session.user = {
                id: token.id!,
                name: token.name!,
                email: token.email!,
            }

            return session
        },
    },

    session: {
        strategy: 'jwt',
    },

    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
