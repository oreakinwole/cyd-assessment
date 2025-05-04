import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SessionProvider } from '@/components/session-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Authentication App',
    description: 'Next.js authentication with NextAuth, Prisma, and MongoDB',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions)

    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>{children}</SessionProvider>
            </body>
        </html>
    )
}
