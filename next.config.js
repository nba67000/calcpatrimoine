/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirections
  async redirects() {
    return [
      // Redirection www → non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.calcpatrimoine.fr',
          },
        ],
        destination: 'https://calcpatrimoine.fr/:path*',
        permanent: true, // 301 redirect
      },
    ]
  },
  
  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
