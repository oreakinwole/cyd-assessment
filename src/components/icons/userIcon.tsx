import * as React from 'react'
import type { SVGProps } from 'react'
const UserIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 22" {...props}>
        <circle cx={10.5} cy={5.631} r={3.5} stroke="#fff" strokeWidth={1.5} />
        <ellipse cx={10.5} cy={15.256} stroke="#fff" strokeWidth={1.5} rx={6.125} ry={3.5} />
    </svg>
)
export default UserIcon
