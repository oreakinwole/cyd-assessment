'use client'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import signupAction from '@/app/signup/action'
import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Loader from '@/components/dashboard/loader/loader'

function SubmitButton() {
    const { pending } = useFormStatus()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) {
        return (
            <div>
                <Navbar />
                <Loader />
            </div>
        )
    }

    return (
        <button type="submit" className="bg-primary w-full p-2 rounded-[0.6rem] my-1 text-background" disabled={pending}>
            {pending ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-background"></div>
                </div>
            ) : (
                'Sign up'
            )}
        </button>
    )
}

export default function Signup() {
    const [error, formaction] = useActionState(signupAction, undefined)
    useEffect(() => {
        console.log(error)
    }, [error])
    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center text-foreground bg-foreground/[0.02] px-4 sm:px-6">
                <div className="bg-background p-4 sm:p-7 rounded-2xl my-4 sm:my-8 shadow-md w-full max-w-[450px]">
                    <div className="flex flex-col justify-center items-center text-2xl font-semibold mb-4">
                        <p>Welcome</p>
                        <p className="text-sm font-normal">Create your account to continue</p>
                    </div>
                    <form action={formaction}>
                        <div className="flex flex-col font-semibold text-sm text-foreground/70 my-4">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="p-3 my-2 text-foreground/70 text-xs bg-foreground/5 border-2 rounded-[0.6rem]"
                                id="email"
                                name="email"
                                placeholder="Enter Email"
                            />
                            {typeof error === 'object' && error?.error?.email && (
                                <p className="text-red-500 text-xs mt-1">{error.error.email}</p>
                            )}
                        </div>
                        <div className="flex flex-col font-semibold text-sm text-foreground/70 my-4">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="p-3 my-2 text-foreground/70 text-xs border-2 bg-foreground/5 rounded-[0.6rem]"
                                id="name"
                                name="name"
                                placeholder="Enter Name"
                            />
                        </div>
                        <div className="flex flex-col font-semibold text-sm text-foreground/70 my-4">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="p-3 my-2 text-foreground/70 text-xs border-2 bg-foreground/5 rounded-[0.6rem]"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                            />
                            {typeof error === 'object' && error?.error?.password && (
                                <p className="text-red-500 text-xs mt-1">{error.error.password}</p>
                            )}
                        </div>
                        <div className="text-xs text-foreground/70">
                            <p>
                                By continuing, you agree to our <span className="text-primary">Terms of Use</span> and{' '}
                                <span className="text-primary">Privacy Policy</span>.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-3 font-semibold text-sm text-foreground/70 my-4 w-full">
                            <SubmitButton />
                            <p className="text-foreground/50 text-sm font-medium line">
                                Already have an account?
                                <Link href="/signin">
                                    <span className="text-foreground underline"> Sign in</span>
                                </Link>
                            </p>
                        </div>
                    </form>
                    <div className="flex justify-center items-center my-3">
                        <div className="w-full h-3 border-t border-foreground opacity-15"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
