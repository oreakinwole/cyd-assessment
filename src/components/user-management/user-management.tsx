'use client'

import { useState } from 'react'
import { UserTable } from './user-table'
import { UserForm } from './user-form'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function UserManagement() {
    const [activeTab, setActiveTab] = useState('all-users')
    const { toast } = useToast()

    const handleAddUserSuccess = () => {
        toast({
            title: 'User added successfully',
            description: 'The new user has been added to the database.',
        })
        setActiveTab('all-users')
    }

    return (
        <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
                <p className="mt-1 text-sm text-gray-500">Add, view, edit, and delete users in the system.</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-6 pt-4">
                    <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="all-users">All Users</TabsTrigger>
                        <TabsTrigger value="add-user">Add User</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="all-users" className="p-6">
                    <div className="mb-6 flex justify-end">
                        <Button onClick={() => setActiveTab('add-user')}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add New User
                        </Button>
                    </div>
                    <UserTable />
                </TabsContent>

                <TabsContent value="add-user" className="p-6">
                    <UserForm onSuccess={handleAddUserSuccess} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
