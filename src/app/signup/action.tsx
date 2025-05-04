'use server'

import { validateField } from '@/utils/validations'
import { redirect } from 'next/navigation'

export default async function signupAction(
    currentState: any,
    formData: FormData,
): Promise<string | Record<string, Record<string, string>>> {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    const emailError = validateField(email, 'Email', 'email')
    const passwordError = validateField(password, 'Password', 'password')

    const errors: Record<string, string> = {}
    if (emailError) errors.email = emailError
    if (passwordError) errors.password = passwordError

    if (Object.keys(errors).length > 0) {
        return { error: errors }
    }

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
    })

    console.log(res)

    const json = await res.json()

    if (res.ok) {
        redirect('/signin')
    } else {
        return { error: { general: json.error || 'An unexpected error occurred.' } }
    }
}
