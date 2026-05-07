/** @type {import('next').NextConfig} */

// Content-Security-Policy
// 'unsafe-inline' est requis pour Next.js App Router (scripts d'hydratation) et Tailwind.
// Peut être resserré avec des nonces CSP dans une itération future.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  // Vercel Analytics (beacon) + Umami (stats) — connexions sortantes légitimes
  "connect-src 'self' https://vitals.vercel-insights.com https://eu.umami.is",
  // Polices servies localement via @fontsource — pas besoin de Google Fonts
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // frame-ancestors remplace X-Frame-Options (on garde les deux pour la compat)
  "frame-ancestors 'none'",
].join('; ')

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Content-Security-Policy', value: CSP },
          // Désactive les APIs navigateur non utilisées par le site
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
