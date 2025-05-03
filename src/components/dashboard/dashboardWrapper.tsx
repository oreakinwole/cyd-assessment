import type { ReactNode, HTMLAttributes } from 'react'
import React from 'react'
import HomeIcon from '../icons/dashboard/homeIcon'
import SecondaryButton from '../utils/SecondaryButton'

type Button = {
    icon: React.ReactNode
    label: string
    url: string
}

interface DashboardWrapperProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    className?: string
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-[17vw_1fr] gap-3
         bg-background min-h-screen ${className}`}
            {...props}
        >
            <div className="hidden md:block px-6 py-2 space-y-1 w-auto shadow-none transition-all bg-background h-auto">
                <SecondaryButton href="/" className={`w-full !justify-start !shadow-none border-none !py-3 text-foreground`} type="link">
                    <div className="flex items-center gap-2">
                        <HomeIcon />
                        <span>Users</span>
                    </div>
                </SecondaryButton>
            </div>
            <div className=" bg-muted-background p-3 sm:p-5 border-t border-l border-2 rounded-tl-3xl shadow-sm">
                <div className="max-w-7xl mx-auto">{children}</div>
                <div className="h-50"></div>
            </div>
        </div>
    )
}

export default DashboardWrapper
