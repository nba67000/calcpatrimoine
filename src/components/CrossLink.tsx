import Link from 'next/link'

interface CrossLinkProps {
  title: string
  description: string
  href: string
  variant?: 'blue'
}

export default function CrossLink({ title, description, href }: CrossLinkProps) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-surface-card transition-colors pr-4"
      style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
    >
      <div>
        <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">{title}</p>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
      <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
    </Link>
  )
}
