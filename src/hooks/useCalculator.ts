// src/hooks/useCalculator.ts
//
// Hook unifié pour les composants Calculator UI standard.
//
// Absorbe le triplet répété {useSimStorage → useMemo(compute) → useEffect(saveSimHistory)}
// qui se trouvait dupliqué dans chaque CalculatorXxx.tsx. Voir candidat #1 du scan
// `/improve-codebase-architecture` du 2026-05-31.
//
// Usage minimal :
//   const { inputs, setInputs, reset, results } = useCalculator({
//     slug: 'ifi',
//     nom: 'IFI - Fortune immobilière',
//     href: '/ifi',
//     defaultInputs: DEFAULT_INPUTS,
//     compute: calculerIFI,
//     resume: r => r.ifiNet > 0 ? `IFI : ${formatEur(r.ifiNet)}` : null,
//   })
//
// Le composant garde la main sur le JSX (saisie/résultats, AlertList, ChatWidget,
// SimResumeBanner). Le hook n'absorbe que la mécanique d'état + persistance + historique.

import { useEffect, useMemo } from 'react'
import { saveSimHistory, useSimStorage } from './useSimStorage'

export interface UseCalculatorOptions<TInputs, TResults> {
  /** Slug du calculateur, identique au slug du module et à la clé localStorage. */
  slug: string
  /** Nom affiché dans l'historique des simulations. */
  nom: string
  /** Lien de la page calculateur. */
  href: string
  /** Inputs par défaut (première visite ou après reset). */
  defaultInputs: TInputs
  /** Fonction pure de calcul, généralement importée depuis `src/lib/<calc>.ts`. */
  compute: (inputs: TInputs) => TResults
  /**
   * Résumé pour l'historique. Retourne `null` pour ne PAS sauvegarder
   * (ex. résultat nul, état dégénéré non significatif).
   * Reçoit aussi les `inputs` car certains résumés mélangent input et résultat
   * (ex. "Rachat : 30 000 € · PV imposable : 12 000 €").
   */
  resume: (results: TResults, inputs: TInputs) => string | null
}

export interface UseCalculatorReturn<TInputs, TResults> {
  inputs: TInputs
  setInputs: (val: TInputs | ((prev: TInputs) => TInputs)) => void
  reset: () => void
  results: TResults
}

export function useCalculator<TInputs, TResults>(
  options: UseCalculatorOptions<TInputs, TResults>,
): UseCalculatorReturn<TInputs, TResults> {
  const [inputs, setInputs, reset] = useSimStorage<TInputs>(options.slug, options.defaultInputs)
  // `options.compute` est volontairement ignoré : `options` est un objet littéral
  // re-créé à chaque render. Le contrat est que `compute` est une fonction pure
  // stable (importée depuis `src/lib/<calc>.ts`).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const results = useMemo(() => options.compute(inputs), [inputs])

  useEffect(() => {
    const resume = options.resume(results, inputs)
    if (resume === null) return
    saveSimHistory({
      slug: options.slug,
      nom: options.nom,
      href: options.href,
      resume,
      date: new Date().toISOString(),
    })
    // L'historique se met à jour quand results change. `options` et `inputs` ne
    // sont pas suivis : `options` est un objet littéral re-créé à chaque render
    // (suivi déclencherait une boucle), et `inputs` change toujours en même temps
    // que `results` (results est dérivé de inputs).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results])

  return { inputs, setInputs, reset, results }
}
