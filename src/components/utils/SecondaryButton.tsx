'use client'

import React from 'react'
import { Button } from 'react-aria-components'
import Link from 'next/link'

interface BaseSecondaryButtonProps {
    children: React.ReactNode
    className?: string
    color?: string
}

interface LinkButtonProps extends BaseSecondaryButtonProps {
    type: 'link'
    href: string
}

interface RegularButtonProps extends BaseSecondaryButtonProps {
    type?: 'button'
    onClick?: () => void
}

type SecondaryButtonProps = LinkButtonProps | RegularButtonProps

const SecondaryButton: React.FC<SecondaryButtonProps> = (props) => {
    if (props.type === 'link') {
        const { href, children, className, ...rest } = props
        return (
            <Link
                href={href}
                className={` border border-border sm:text-sm rounded-lg px-3 py-2 sm:px-4 sm:py-2 font-semibold shadow-primary/20 shadow-sm hover:bg-primary-foreground transition-all whitespace-nowrap flex justify-center items-center gap-2 ${className}`}
                {...rest}
            >
                {children}
            </Link>
        )
    }

    const { children, className, ...rest } = props
    return (
        <Button
            className={`bg-white border border-border text-sm sm:text-base rounded-lg px-3 py-2 sm:px-4 sm:py-2 font-semibold shadow-primary/20 shadow-sm hover:bg-primary-foreground transition-all whitespace-nowrap flex justify-center items-center gap-2 ${className}`}
            {...rest}
        >
            {children}
        </Button>
    )
}

export default SecondaryButton
