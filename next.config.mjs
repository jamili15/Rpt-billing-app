/** @type {import('next').NextConfig} */
const DOMAIN_PATH = process.env.NEXT_PUBLIC_APP_CONTEXT_PATH || '';

const nextConfig = {
    assetPrefix: DOMAIN_PATH,
    async rewrites() {
        return [
            {
                source: `${DOMAIN_PATH}/_next/static/:path*`,
                destination: '/_next/static/:path*',
            }
        ];
    },
};

export default nextConfig;
