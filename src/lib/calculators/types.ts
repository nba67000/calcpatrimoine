// src/lib/calculators/types.ts
//
// Interface du **module calculateur** (voir CONTEXT.md et ADR-0001).
//
// Tout ce qui définit un calculateur est regroupé dans un objet unique
// exporté par sa lib. Le collecteur `src/lib/calculators/index.ts` agrège
// ces modules et expose `getCalculator(slug)`.
//
// Cette approche remplace les anciens modules de wiring (chatContext.ts,
// sourcesRegistry.ts) qui étaient des pass-throughs purs (cf. ADR-0001).

import type { FAQSchemaItem } from '@/components/SchemaFAQ'
import type { HowToStep } from '@/components/SchemaHowTo'

/** Source légale citée par un calculateur (CGI, BOFiP, service-public, etc.).
 *
 * `href` et `desc` sont optionnels : quand l'URL externe est morte ou pointe
 * vers le mauvais contenu, on retire les deux et on ne garde que le `label`
 * (référence textuelle de l'article). Cf. `docs/broken-links-to-fix.md` pour
 * la liste des liens à reconstruire. */
export interface Source {
  href?: string
  label: string
  desc?: string
}

/** Schéma HowTo JSON-LD complet d'un calculateur. */
export interface HowToSchema {
  name: string
  description: string
  totalTime: string // ISO 8601 : "PT3M" = 3 min
  steps: HowToStep[]
}

/**
 * Module calculateur - tout ce qui le définit derrière un seul export.
 *
 * Les paramètres génériques `TInputs` / `TResults` permettent à chaque
 * module de garder ses types stricts sur `formatContexteChat`. Le registry
 * stocke les modules comme `CalculatorModule` (TInputs/TResults = unknown)
 * et le narrowing est fait au callsite côté composants Calculator.
 */
export interface CalculatorModule<TInputs = unknown, TResults = unknown> {
  /** Slug URL (ex. 'tmi', 'donation/droits'). Sert de clé dans le registry. */
  slug: string
  /** Nom court pour affichage et historique de simulations. */
  nom: string
  /** Sources légales affichées par <SourcesSection slug={slug}>. */
  sources: Source[]
  /** Items FAQ JSON-LD (texte brut) - injectés par <SchemaFAQ>. */
  faqSchema: FAQSchemaItem[]
  /** Schéma HowTo JSON-LD - injecté par <SchemaHowTo>. */
  howToSchema: HowToSchema
  /** Formatte le contexte d'une simulation pour le chatbot (system prompt). */
  formatContexteChat: (inputs: TInputs, results: TResults) => string
}
