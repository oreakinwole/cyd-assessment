import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import UserManagement from '@/components/user-management/user-management'
import SignOutButton from '@/components/auth/sign-out-button'

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="py-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="mt-2 text-gray-600">Welcome, {session.user?.name || session.user?.email}!</p>
                    </div>
                    <SignOutButton />
                </div>

                <div className="py-6">
                    <UserManagement />
                </div>
            </div>
        </div>
    )
}
