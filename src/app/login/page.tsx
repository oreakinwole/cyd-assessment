import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import LoginForm from '@/components/login-form'

export default async function LoginPage() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect('/dashboard')
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        create a new account
                    </a>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
