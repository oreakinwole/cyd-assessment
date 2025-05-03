import * as React from 'react'
import { SVGProps } from 'react'
const LogOutIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" {...props}>
        <path
            fill="#171717"
            d="M14 1.667h-2.167C9.167 1.667 7.5 3.333 7.5 6v3.375h5.208a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625H7.5V14c0 2.666 1.667 4.333 4.333 4.333h2.159c2.666 0 4.333-1.666 4.333-4.333V6c.008-2.667-1.658-4.333-4.325-4.333ZM3.8 9.375 5.525 7.65a.618.618 0 0 0 .184-.442.605.605 0 0 0-.184-.441.629.629 0 0 0-.883 0L1.85 9.558a.629.629 0 0 0 0 .884l2.792 2.791a.629.629 0 0 0 .883 0 .629.629 0 0 0 0-.883L3.8 10.625h3.7v-1.25H3.8Z"
        />
    </svg>
)
export default LogOutIcon
