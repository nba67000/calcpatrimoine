// src/components/SourcesSection.tsx
import { getCalculator } from '@/lib/calculators'
import type { Source } from '@/lib/calculators/types'

interface Props {
  sources?: Source[]
  /** Slug du calculateur — résolution automatique via le registry (cf. ADR-0001). */
  slug?: string
  title?: string
}

export default function SourcesSection({ sources, slug, title = 'Textes de loi' }: Props) {
  const items: Source[] = sources ?? (slug ? getCalculator(slug)?.sources ?? [] : [])

  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3">
        {title}
      </h3>
      <ul className="space-y-3 text-sm">
        {items.map((s, i) => (
          <li key={s.href ?? `${s.label}-${i}`} className="flex items-start gap-3">
            <span className="text-accent-400 mt-0.5 shrink-0">-</span>
            <div>
              {s.href ? (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline font-medium"
                >
                  {s.label}
                </a>
              ) : (
                <span className="text-neutral-700 font-medium">{s.label}</span>
              )}
              {s.desc && <p className="text-neutral-500 text-xs mt-0.5">{s.desc}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
