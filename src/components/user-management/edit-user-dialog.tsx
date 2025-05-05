'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AlertCircle } from 'lucide-react'
import { updateUser } from '@/lib/user-actions'
import { UserRole, UserStatus } from '@prisma/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface User {
    id: string
    name: string | null
    email: string
    role: UserRole
    status: UserStatus
}

interface EditUserDialogProps {
    user: User
    open: boolean
    onOpenChange: (open: boolean) => void
    onUserUpdated: () => void
}

export function EditUserDialog({ user, open, onOpenChange, onUserUpdated }: EditUserDialogProps) {
    const [name, setName] = useState(user.name || '')
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<UserRole>(user.role)
    const [status, setStatus] = useState<UserStatus>(user.status)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            await updateUser({
                id: user.id,
                name,
                email,
                password: password || undefined,
                role,
                status,
            })
            onUserUpdated()
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to update user')
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>Make changes to the user information here. Click save when you're done.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Name</Label>
                            <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter user's name" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-email">Email</Label>
                            <Input
                                id="edit-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter user's email"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-password">
                                Password <span className="text-gray-500 text-xs">(Leave blank to keep current)</span>
                            </Label>
                            <Input
                                id="edit-password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-role">Role</Label>
                            <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                                <SelectTrigger id="edit-role">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                                    <SelectItem value={UserRole.MANAGER}>Manager</SelectItem>
                                    <SelectItem value={UserRole.USER}>User</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-status">Status</Label>
                            <Select value={status} onValueChange={(value) => setStatus(value as UserStatus)}>
                                <SelectTrigger id="edit-status">
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
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
