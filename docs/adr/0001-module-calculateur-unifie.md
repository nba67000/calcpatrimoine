# ADR-0001 - Module calculateur unifié

**Statut** : Accepté
**Date** : 2026-05-30

## Contexte

À 8 calculateurs livrés, ajouter un nouveau calculateur exigeait
d'éditer **3 à 5 fichiers de wiring**, chacun avec une syntaxe
différente :

1. `src/lib/chatContext.ts` - type discriminé `ContexteChat` + switch
   exhaustif pour dispatcher vers `formatContexte<Calc>`.
2. `src/lib/sourcesRegistry.ts` - Record `slug → SOURCES_XXX[]` agrégeant
   les imports.
3. `src/lib/schema/schemaData.ts` - monolithe de ~2500 lignes contenant
   tous les `FAQ_XXX` et `HOWTO_XXX` JSON-LD.
4. `src/config/navigation.ts` - liste plate `CATEGORIES_CALC[].calculateurs[]`.
5. `src/app/sitemap.ts` - URLs FAQ ajoutées à la main (les URLs
   calculateur sont auto-dérivées de `navigation.ts`).

Le scan `/improve-codebase-architecture` du 2026-05-30 a appliqué le
**deletion test** à `chatContext.ts` et `sourcesRegistry.ts` :

- `chatContext.ts` : 1 seul callsite (`ChatWidget`), pas de
  transformation, juste un dispatch. Suppression → la complexité ne
  réapparaît **pas** ailleurs, elle se concentre dans un collecteur
  unique.
- `sourcesRegistry.ts` : 1 seul callsite (`SourcesSection`), idem.

Les deux modules sont des **pass-throughs** purs. Le coût de leur
existence est qu'ils dispersent la connaissance d'un calculateur sur
5 fichiers (anti-locality).

## Décision

Chaque calculateur exporte depuis sa lib `src/lib/<calc>.ts` un objet
unique conforme à l'interface `CalculatorModule` (`src/lib/calculators/types.ts`) :

```ts
export const moduleTmi: CalculatorModule = {
  slug: 'tmi',
  nom: '...',
  sources: SOURCES_TMI,
  faqSchema: FAQ_TMI,
  howToSchema: HOWTO_TMI,
  formatContexteChat: (inputs, results) => '...',
}
```

Un collecteur unique (`src/lib/calculators/index.ts`) agrège les modules
et expose `getCalculator(slug): CalculatorModule | undefined`.

Conséquences :
- `chatContext.ts` est **supprimé**. `ChatWidget` interroge le registry.
- `sourcesRegistry.ts` est **supprimé**. `SourcesSection` interroge le
  registry.
- `schema/schemaData.ts` est **conservé en transition** (cf. Suivi
  ci-dessous). Les `FAQ_XXX` et `HOWTO_XXX` y restent définis et les
  libs les importent puis les ré-exposent via leur module. Les 16
  pages app continuent d'importer FAQ/HowTo depuis `schemaData.ts`
  sans rupture. Le bénéfice principal (un seul point d'accès via
  `getCalculator(slug).faqSchema`) est obtenu côté code nouveau.
- `navigation.ts` est **conservé**. Il porte des métadonnées d'UX
  (catégorie, ordre, description courte) qui sont **distinctes** du
  comportement du calculateur.

## Raison

**Deep > shallow.** Un seul module agrège tout ce qui définit un
calculateur. La connaissance se concentre.

**Locality.** Pour comprendre/modifier "TMI", on lit `src/lib/tmi.ts`,
pas 5 fichiers.

**Leverage.** Ajouter un calculateur = créer la lib + l'ajouter au
collecteur. Plus de switch à maintenir, plus de Record à enrichir,
plus de monolithe SEO à éviter de désynchroniser.

**Test surface améliorée.** Le contrat "un calculateur" devient
testable par snapshot du shape. Plus de test "le switch couvre-t-il
tous les cas ?".

**Lazy-loading préservé.** Les composants UI continuent d'être
lazy-loadés via `dynamic()` côté page. Le registry n'embarque que
des métadonnées + une fonction `formatContexteChat` légère.

## Alternatives rejetées

**Garder le wiring séparé** : défendable si on voulait du lazy-loading
strict côté serveur du formatContexteChat. Mais les 8 formateurs
combinés font moins de 8 ko de code. Le coût mental de la dispersion
excédait largement le bénéfice théorique.

**Auto-discovery via `require.context`** : Next.js App Router le rend
fragile. Un import explicite dans `calculators/index.ts` est plus
prévisible et reste sous TypeScript exhaustivité.

## Suivi

- ADR-0002 (à venir si #2 du scan est implémenté) traitera de
  l'extraction d'un `CalculatorShell` pour absorber le boilerplate
  des composants Calculator UI.
- Migration progressive de `src/lib/schema/schemaData.ts` vers les
  libs : déplacer les `FAQ_XXX` et `HOWTO_XXX` un calc à la fois,
  puis mettre à jour les 16 imports de pages (FAQ + calculator
  pages) pour pointer vers `@/lib/<calc>`. Suppression finale du
  fichier lorsque tous les calcs sont migrés. Reporté pour éviter
  un commit massif en une session.
- Fusion `src/types/<calc>.ts` → `src/lib/<calc>.ts` : candidat #4
  du scan `/improve-codebase-architecture` (déplacer les types
  Inputs/Results dans la lib correspondante, ne garder dans
  `src/types/` que les types partagés `alerts.ts` et `index.ts`).
  Reporté : 22 fichiers importeurs, gain cosmétique vs. risque de
  régression. À reprendre quand la migration de `schemaData.ts`
  sera lancée (mêmes pages impactées, économies d'échelle).
