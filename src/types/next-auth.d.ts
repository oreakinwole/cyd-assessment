import NextAuth, { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string
            name?: string | null
            email: string
        }
    }

    interface User {
        id: string
        name?: string | null
        email: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        name?: string | null
        email: string
    }
}
