// src/components/CrossLink.tsx
import Link from 'next/link'

interface CrossLinkProps {
  title: string
  description: string
  href: string
  icon?: string
  variant?: 'blue' | 'green' | 'purple'
}

export default function CrossLink({ 
  title, 
  description, 
  href, 
  icon = '→',
  variant = 'blue' 
}: CrossLinkProps) {
  const variantStyles = {
    blue: 'bg-primary-50 border-primary-200 hover:border-blue-300 text-primary-900',
    green: 'bg-success-50 border-green-200 hover:border-green-300 text-green-900',
    purple: 'bg-purple-50 border-purple-200 hover:border-purple-300 text-purple-900',
  }

  const iconStyles = {
    blue: 'text-primary-600',
    green: 'text-success-600',
    purple: 'text-primary-700',
  }

  return (
    <Link 
      href={href}
      className={`block border-2 rounded-lg p-4 transition-all hover:shadow-md ${variantStyles[variant]}`}
    >
      <div className="flex items-start gap-3">
        <span className={`text-2xl ${iconStyles[variant]}`}>{icon}</span>
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
