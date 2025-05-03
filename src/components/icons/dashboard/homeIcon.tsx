import * as React from 'react'
import type { SVGProps } from 'react'
const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 21" {...props}>
        <g stroke="#005CF0" strokeWidth={2} clipPath="url(#a)">
            <path d="M1.75 10.678c0-2.002 0-3.003.454-3.833C2.66 6.015 3.49 5.5 5.15 4.47L6.9 3.384c1.753-1.09 2.63-1.634 3.6-1.634.97 0 1.847.545 3.601 1.634l1.75 1.086c1.66 1.03 2.49 1.545 2.945 2.375.454.83.454 1.831.454 3.833v1.331c0 3.414 0 5.12-1.025 6.18C17.2 19.25 15.55 19.25 12.25 19.25h-3.5c-3.3 0-4.95 0-5.975-1.06-1.025-1.06-1.025-2.767-1.025-6.18v-1.332Z" />
            <path strokeLinecap="round" d="M13.125 15.75h-5.25" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h21v21H0z" />
            </clipPath>
        </defs>
    </svg>
)
export default HomeIcon
