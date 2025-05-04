import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-4xl bg-white p-8 shadow rounded-lg">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <div className="mb-6">
                    <p className="text-gray-700">Welcome, {session.user?.name || session.user?.email}!</p>
                    <p className="text-gray-500 mt-2">You are now signed in to your account.</p>
                    <div className="border-t pt-4">
                        <Link href="/api/auth/signout" className="text-indigo-600 hover:text-indigo-500 font-medium">
                            Sign out
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
