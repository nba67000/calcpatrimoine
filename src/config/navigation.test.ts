import { describe, it, expect } from 'vitest'
import { existsSync } from 'fs'
import { join } from 'path'
import { CATEGORIES_CALC } from './navigation'

// Vérifie que chaque calculateur marqué `disponible: true` a une page Next.js.
// Évite les liens morts dans le header/footer.
describe('navigation , cohérence routes', () => {
  const disponibles = CATEGORIES_CALC.flatMap(c => c.calculateurs).filter(c => c.disponible)

  it.each(disponibles.map(c => [c.href, c.nom]))(
    '%s (%s) , page.tsx existe',
    (href) => {
      const routePath = join(process.cwd(), 'src', 'app', ...href.replace(/^\//, '').split('/'), 'page.tsx')
      expect(existsSync(routePath), `Route manquante : src/app${href}/page.tsx`).toBe(true)
    }
  )
})
