'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createUser } from '@/lib/user-actions'
import { AlertCircle } from 'lucide-react'
import { UserRole, UserStatus } from '@prisma/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface UserFormProps {
    onSuccess?: () => void
}

export function UserForm({ onSuccess }: UserFormProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<UserRole>(UserRole.USER)
    const [status, setStatus] = useState<UserStatus>(UserStatus.ACTIVE)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            await createUser({ name, email, password, role, status })
            setName('')
            setEmail('')
            setPassword('')
            setRole(UserRole.USER)
            setStatus(UserStatus.ACTIVE)
            if (onSuccess) {
                onSuccess()
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to create user')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
            <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter user's name" />
            </div>

            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter user's email"
                    required
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter user's password"
                    required
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.MANAGER}>Manager</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value) => setStatus(value as UserStatus)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={UserStatus.ACTIVE}>Active</SelectItem>
                        <SelectItem value={UserStatus.INACTIVE}>Inactive</SelectItem>
                        <SelectItem value={UserStatus.PENDING}>Pending</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {error && (
                <div className="bg-red-50 p-4 rounded-md flex items-start gap-3 text-red-700">
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create User'}
                </Button>
            </div>
        </form>
    )
}
