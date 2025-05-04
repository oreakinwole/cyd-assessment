import React from 'react'
import UserIcon from './icons/userIcon'
import ListIcon from './icons/listIcon'

const Navbar: React.FC = () => (
    <header className="sticky top-0 text-foreground bg-background border-b-2">
        <div className="w-full px-3 py-2 sm:px-4 md:px-6 lg:container lg:mx-auto grid grid-cols-[1fr_auto] items-center">
            <div className="flex flex-row justify-start items-center gap-2 sm:gap-4 md:gap-7">
                <div className="flex-shrink-0">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold whitespace-nowrap">
                        <span className="md:hidden">
                            Cyd<span className="text-primary">L</span>
                        </span>
                        <span className="hidden md:block">
                            AssessMent<span className="text-primary">Lab</span>
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    <ListIcon className="size-5 sm:size-6 md:size-8 text-foreground" />
                    {/* <p className="text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-full"></p> */}
                </div>
            </div>
            <div className="flex gap-1 sm:gap-2 justify-end items-center p-1.5 sm:p-2 bg-primary text-background text-xs sm:text-sm rounded-md">
                <UserIcon className="size-3 sm:size-4 text-background" />
                <p className="whitespace-nowrap">Login</p>
            </div>
        </div>
    </header>
)

export default Navbar
