'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { EditIcon, Trash2Icon, RefreshCw, Search } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { EditUserDialog } from './edit-user-dialog'
import { DeleteUserDialog } from './delete-user-dialog'
import { fetchUsers, type PaginationParams } from '@/lib/user-actions'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

type User = {
    id: string
    name: string | null
    email: string
    createdAt: Date
}

type PaginationInfo = {
    total: number
    page: number
    limit: number
    totalPages: number
}

export function UserTable() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [userToEdit, setUserToEdit] = useState<User | null>(null)
    const [userToDelete, setUserToDelete] = useState<User | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [pagination, setPagination] = useState<PaginationInfo>({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    })
    const { toast } = useToast()

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 300)

        return () => clearTimeout(timer)
    }, [searchTerm])

    // Reset to page 1 when search term changes
    useEffect(() => {
        setPagination((prev) => ({ ...prev, page: 1 }))
    }, [debouncedSearchTerm])

    const loadUsers = async () => {
        setLoading(true)
        try {
            const params: PaginationParams = {
                page: pagination.page,
                limit: pagination.limit,
                search: debouncedSearchTerm,
            }

            const result = await fetchUsers(params)
            setUsers(result.users)
            setPagination(result.pagination)
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
    }, [pagination.page, pagination.limit, debouncedSearchTerm])

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

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setPagination((prev) => ({ ...prev, page: newPage }))
        }
    }

    return (
        <div>
            <div className="mb-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Button variant="outline" onClick={loadUsers} disabled={loading}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>
            </div>

            {loading && users.length === 0 ? (
                <div className="flex justify-center py-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="h-4 bg-gray-200 rounded w-64"></div>
                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </div>
                </div>
            ) : users.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    {debouncedSearchTerm ? 'No users found matching your search.' : 'No users found. Add a new user to get started.'}
                </div>
            ) : (
                <>
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

                    {pagination.totalPages > 1 && (
                        <div className="mt-4 flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(pagination.page - 1)}
                                            className={pagination.page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink isActive={page === pagination.page} onClick={() => handlePageChange(page)}>
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(pagination.page + 1)}
                                            className={
                                                pagination.page >= pagination.totalPages
                                                    ? 'pointer-events-none opacity-50'
                                                    : 'cursor-pointer'
                                            }
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}

                    <div className="mt-2 text-center text-sm text-gray-500">
                        Showing {users.length} of {pagination.total} users
                    </div>
                </>
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
