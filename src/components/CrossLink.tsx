// src/components/CrossLink.tsx
import Link from 'next/link'

interface CrossLinkProps {
  title: string
  description: string
  href: string
  variant?: 'blue'
}

export default function CrossLink({
  title,
  description,
  href,
}: CrossLinkProps) {
  return (
    <Link
      href={href}
      className="block bg-primary-50 border-2 border-primary-200 rounded-lg p-5 transition-all hover:border-primary-400 hover:shadow-md text-primary-900"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
        <svg
          className="w-5 h-5 flex-shrink-0 mt-1 opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
