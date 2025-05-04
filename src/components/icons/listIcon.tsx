import * as React from 'react'
import type { SVGProps } from 'react'
const ListIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 33" {...props}>
        <rect width={32} height={32} y={0.5} fill="#fff" rx={4} />
        <path stroke="#797A7E" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 9h18M7 14h9.47M7 19h18M7 24h9.47" />
    </svg>
)
export default ListIcon
