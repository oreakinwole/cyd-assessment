'use client'

import { validateField } from '@/utils/validations'
import { signIn } from 'next-auth/react'

export default async function signinAction(currentState: any, formData: FormData): Promise<{ error?: Record<string, string> } | void> {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const emailError = validateField(email, 'Email', 'email')
    const passwordError = validateField(password, 'Password', 'password')

    const errors: Record<string, string> = {}
    if (emailError) errors.email = emailError
    if (passwordError) errors.password = passwordError

    if (Object.keys(errors).length > 0) {
        return { error: errors }
    }

    try {
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
            // callbackUrl: `https://spectacular-vale-gpulab-1a348a6b.koyeb.app/dockerImages`,
        })

        if (res?.ok) {
            window.location.href = `https://spectacular-vale-gpulab-1a348a6b.koyeb.app/dockerImages`
        } else {
            return { error: { general: 'An unexpected error occurred. Please try again later.' } }
        }
    } catch (error) {
        console.error('Sign-in error:', error)
        return { error: { general: 'An unexpected error occurred. Please try again later.' } }
    }
}
