import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    // eslint: {
    //     dirs: ['src', 'prisma'],
    // },
}

export default nextConfig
