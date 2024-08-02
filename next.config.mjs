/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'tailwindui.com',
            port: '',
            pathname: '/img/**',
          },
          {
            protocol: 'https',
            hostname: 'cdn.shopify.com',
            port: '',
            pathname: '/s/files/**',
          },
          {
            protocol: 'https',
            hostname: 'dummyimage.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'robohash.org',
          },
        ],
        dangerouslyAllowSVG: true,
      },

};

export default nextConfig;
