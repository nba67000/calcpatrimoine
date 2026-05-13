import Link from 'next/link'

interface CrossLinkProps {
  title: string
  description: string
  href: string
  variant?: 'blue'
  /**
   * Valeurs du résultat à injecter dans `description`.
   * Syntaxe : "{key}" dans la chaîne description.
   * Ex: description="Votre TMI est à {tmi} — un versement PER de {perSuggere} économiserait ~{economie}."
   */
  context?: Record<string, string | number>
}

function interpolate(text: string, context?: Record<string, string | number>): string {
  if (!context) return text
  return text.replace(/\{(\w+)\}/g, (_, key) => {
    if (key in context) return String(context[key])
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[CrossLink] clé manquante: "${key}" dans: "${text}"`)
    }
    return `{${key}}`
  })
}

export default function CrossLink({ title, description, href, context }: CrossLinkProps) {
  const resolvedDescription = interpolate(description, context)

  return (
    <Link
      href={href}
      className="group flex items-center justify-between py-5 border-b border-neutral-200 hover:bg-surface-card transition-colors pr-4"
      style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
    >
      <div>
        <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors mb-0.5">{title}</p>
        <p className="text-sm text-neutral-500">{resolvedDescription}</p>
      </div>
      <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
    </Link>
  )
}
