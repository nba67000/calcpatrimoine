import Link from 'next/link'
import { CATEGORIES_CALC } from '@/config/navigation'
import type { Calculateur } from '@/config/navigation'

type CalcWithCategorie = Calculateur & { categorie: string }

function getRelated(currentHref: string, count = 3): CalcWithCategorie[] {
  const currentCat = CATEGORIES_CALC.find(c =>
    c.calculateurs.some(x => x.href === currentHref)
  )

  const sameCat: CalcWithCategorie[] = currentCat
    ? currentCat.calculateurs
        .filter(c => c.disponible && c.href !== currentHref)
        .map(c => ({ ...c, categorie: currentCat.label }))
    : []

  const otherCat: CalcWithCategorie[] = CATEGORIES_CALC
    .filter(c => c.id !== currentCat?.id)
    .flatMap(c =>
      c.calculateurs
        .filter(x => x.disponible)
        .map(x => ({ ...x, categorie: c.label }))
    )

  return [...sameCat, ...otherCat].slice(0, count)
}

interface Props {
  currentHref: string
}

export default function RelatedCalcSection({ currentHref }: Props) {
  const related = getRelated(currentHref)
  if (related.length === 0) return null

  return (
    <section className="max-w-4xl mx-auto px-6 pb-8">
      <div className="flex items-center gap-4 mb-2">
        <h2 className="font-mono text-xs uppercase tracking-widest text-neutral-400 shrink-0">
          Explorer aussi
        </h2>
        <div className="flex-1 h-[1px] bg-neutral-200" />
      </div>

      <div className="border-t border-neutral-200">
        {related.map(calc => (
          <Link
            key={calc.href}
            href={calc.href}
            className="group flex items-center justify-between py-4 border-b border-neutral-200 hover:bg-white transition-colors pr-4"
            style={{ borderLeft: '3px solid #D4AF37', paddingLeft: '1.25rem' }}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-0.5">
                <p className="font-bold text-neutral-900 group-hover:text-primary-700 transition-colors">
                  {calc.nom}
                </p>
                <span className="font-mono text-xs text-neutral-400 shrink-0">{calc.categorie}</span>
              </div>
              <p className="text-sm text-neutral-500 leading-snug">{calc.desc}</p>
            </div>
            <span className="font-mono text-primary-600 group-hover:translate-x-1 transition-transform ml-4 shrink-0">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
