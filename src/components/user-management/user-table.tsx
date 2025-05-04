'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { EditIcon, Trash2Icon, RefreshCw } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { EditUserDialog } from './edit-user-dialog'
import { DeleteUserDialog } from './delete-user-dialog'
import { fetchUsers } from '@/lib/user-actions'

type User = {
    id: string
    name: string | null
    email: string
    createdAt: Date
}

export function UserTable() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [userToEdit, setUserToEdit] = useState<User | null>(null)
    const [userToDelete, setUserToDelete] = useState<User | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const { toast } = useToast()

    const loadUsers = async () => {
        setLoading(true)
        try {
            const fetchedUsers = await fetchUsers()
            setUsers(fetchedUsers)
        } catch (error) {
            toast({
                title: 'Error loading users',
                description: 'There was a problem loading the users. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const handleEditClick = (user: User) => {
        setUserToEdit(user)
        setIsEditDialogOpen(true)
    }

    const handleDeleteClick = (user: User) => {
        setUserToDelete(user)
        setIsDeleteDialogOpen(true)
    }

    const handleUserUpdated = () => {
        loadUsers()
        setIsEditDialogOpen(false)
        toast({
            title: 'User updated',
            description: 'The user information has been updated successfully.',
        })
    }

    const handleUserDeleted = () => {
        loadUsers()
        setIsDeleteDialogOpen(false)
        toast({
            title: 'User deleted',
            description: 'The user has been deleted successfully.',
        })
    }

    return (
        <div>
            <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-medium">All Users</h3>
                <Button variant="outline" onClick={loadUsers} disabled={loading}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="h-4 bg-gray-200 rounded w-64"></div>
                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </div>
                </div>
            ) : users.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No users found. Add a new user to get started.</div>
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name || '—'}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="sm" onClick={() => handleEditClick(user)}>
                                            <EditIcon className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(user)}>
                                            <Trash2Icon className="h-4 w-4 text-red-500" />
                                            <span className="sr-only">Delete</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {userToEdit && (
                <EditUserDialog
                    user={userToEdit}
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                    onUserUpdated={handleUserUpdated}
                />
            )}

            {userToDelete && (
                <DeleteUserDialog
                    user={userToDelete}
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                    onUserDeleted={handleUserDeleted}
                />
            )}
        </div>
    )
}
