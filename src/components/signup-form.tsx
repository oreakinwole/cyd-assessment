'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle } from 'lucide-react'
import { registerUser } from '@/lib/actions'

export default function SignupForm() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const result = await registerUser({ name, email, password })

            if (result.error) {
                setError(result.error)
                setIsLoading(false)
                return
            }

            await fetch('/api/auth/signin/credentials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, redirect: false }),
            })

            router.push('/dashboard')
            router.refresh()
        } catch (error) {
            setError('Something went wrong. Please try again.')
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 p-4 rounded-md flex items-start gap-3 text-red-700">
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            <div>
                <Label htmlFor="name">Name</Label>
                <div className="mt-1">
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="email">Email address</Label>
                <div className="mt-1">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1">
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
            </div>
        </form>
    )
}
