# ADR-0002 - CalculateurPageLayout absorbant + hook useCalculator

**Statut** : Accepté
**Date** : 2026-05-31

## Contexte

Le scan `/improve-codebase-architecture` du 2026-05-31 (faisant suite à
ADR-0001 qui prévoyait cet ADR en §Suivi) a identifié quatre frictions
architecturales sur le périmètre Calculator UI + pages :

1. **Schémas SEO dupliqués** : chaque page calculateur invoquait
   `<SchemaFAQ items={FAQ_X}>` + `<SchemaHowTo name={HOWTO_X.name} ...>`
   en tête, 4 lignes d'imports + ~10 lignes de JSX × 8 pages.
2. **Section méthodologie répétée** : H2 + container + bandeau date
   + footer disclaimer "Outil indicatif uniquement…" reproduits mot pour
   mot dans 6 pages (~40 lignes × 6 = ~240 lignes).
3. **Boilerplate Calculator UI** : 7/8 composants Calculator répétaient
   le triplet `useSimStorage → useMemo(compute) → useEffect(saveSimHistory)`,
   ~20 lignes par composant.
4. **`formatters.ts` court-circuité** : 12 callsites `toLocaleString('fr-FR')`
   brut dans 4 Calculator UI, contournant le seam des helpers du module.

**Deletion test** appliqué :

- `SchemaFAQ`/`SchemaHowTo` invoqués dans les pages : pass-throughs purs.
  Suppression depuis les pages → la résolution se concentre dans le layout
  (qui connaît déjà le slug via `currentHref`).
- Section méthodologie inline : structure HTML quasi-identique entre pages.
  Suppression depuis les pages → la structure se concentre dans le layout,
  les pages ne fournissent que le contenu via une prop `methodologie`.
- Triplet useSimStorage/useMemo/useEffect : à supprimer, la mécanique
  d'état + persistance + historique se concentre dans un hook unique.

## Décision

### Couche 1 — Layout absorbant

`CalculateurPageLayout` étend son périmètre. Au-delà du chrome
(Header, hero, breadcrumb, RelatedCalcSection, Footer), il absorbe :

1. **Schémas SEO** — quand `currentHref` est fourni, le layout résout
   `getCalculator(slug)` (slug = currentHref sans le `/` initial) et
   injecte `<SchemaHowTo>` + `<SchemaFAQ>` au top du rendu.
2. **Section méthodologie** — nouvelle prop
   `methodologie?: ReactNode`. Le layout rend le wrapper standard
   (`<section>` + H2 "Méthodologie et sources officielles" + container
   blanc + footer disclaimer "Outil indicatif uniquement. Ne constitue
   pas un conseil fiscal ou patrimonial personnalisé.") et place le
   contenu fourni dans un `<div className="space-y-6">`.

Conséquences :

- Les 8 pages calculateur perdent leurs imports `SchemaFAQ`, `SchemaHowTo`,
  et `FAQ_X` / `HOWTO_X` (depuis `schemaData`).
- Les 6 pages avec section méthodologie perdent ~50 lignes chacune
  (wrapper + H2 + container + disclaimer + close tags).
- Le footer disclaimer est normalisé sur "fiscal ou patrimonial" pour
  couvrir l'ensemble des cas (auparavant : 5 disaient "fiscal", 2
  disaient "patrimonial", 1 disait "fiscal ou patrimonial").

### Couche 2 — Hook useCalculator

`src/hooks/useCalculator.ts` exporte un hook qui factorise la mécanique
de state des Calculator UI dont les Inputs persistés **correspondent
directement** au shape des Inputs de la lib.

```ts
const { inputs, setInputs, reset, results } = useCalculator({
  slug: 'ifi',
  nom: 'IFI - Fortune immobilière',
  href: '/ifi',
  defaultInputs: DEFAULT_INPUTS,
  compute: calculerIFI,
  resume: r => r.ifiNet > 0 ? `IFI : ${formatEur(r.ifiNet)}` : null,
})
```

Le hook absorbe : `useSimStorage` (persistance), `useMemo(compute)`
(computation pure), `useEffect(saveSimHistory)` (historique des
simulations). Retourner `null` depuis `resume` désactive la sauvegarde
pour les états dégénérés (résultat nul, etc.).

S'applique à 4 calcs (IFI, AssuranceVie/rachat, Transmission,
PlusValueImmobiliere). Les 4 autres (TMI, PER, Donation, Rente)
maintiennent une couche `useNumericInput` qui découple le shape persisté
du shape des Inputs — pour ces calcs, le hook ne s'applique pas
directement et ils restent en gestion manuelle.

### Couche 3 — Unification des formatters

Les 12 callsites `toLocaleString('fr-FR')` brut dans les Calculator UI
sont remplacés par les helpers existants de `src/lib/formatters.ts`
(`formatEur`, `formatNombre`, `formatPct`). Aucune extension du module
formatters n'a été nécessaire — uniquement la réparation du seam.

## Raison

**Deep > shallow.** Le layout passe d'une interface qui s'arrête au
calculator + children libre à une interface qui possède aussi le chrome
SEO et le wrapper méthodologie. La complexité ne disparaît pas — elle se
concentre au seul endroit qui connaît déjà le slug.

**Locality.** Une page calculateur passe de ~290 lignes (IFI) /
~240 lignes (TMI, donation, …) à ~140-200 lignes, sans perte
d'expressivité. Comprendre "à quoi ressemble une page calculateur" tient
maintenant dans `CalculateurPageLayout.tsx` (et non plus reconstruit
mentalement à partir de 6 pages quasi-identiques).

**Leverage.** Ajouter une fonctionnalité transverse aux pages
calculateur (badge "exporter PDF", bandeau de version, sticky table of
contents…) devient une édition. Idem pour ajouter un effet d'instrumentation
transverse aux Calculator UI (event de télémétrie au save par exemple).

**Test surface.** Le hook `useCalculator` est testable indépendamment
des composants. Le layout devient snapshot-testable avec un module mock.
Les Calculator UI gardent leur testabilité existante (rendering).

## Alternatives rejetées

**Composant `<CalculatorShell>` avec slots `saisie` + `resultats`** :
envisagé initialement. Rejeté car le rendering des Calculator UI diverge
beaucoup (charts, scenarios, tables de comparaison, etc.) — un shell à
slots aurait soit forcé une structure trop rigide, soit dégénéré en
render-prop noodle. Le hook absorbe la mécanique sans imposer la forme
visuelle.

**Étendre `useCalculator` aux 4 calcs `useNumericInput`** : aurait
nécessité une option `transform: (state) => inputs` ou similaire pour
gérer la divergence state-persisté ↔ inputs-calculs. Le gain marginal
(~5 lignes par calc) n'aurait pas justifié la complexification de
l'interface du hook. Si plus tard on fusionne `useNumericInput` dans
`useSimStorage` (ou inversement), le hook pourra s'étendre.

**Slot supplémentaire `disclaimerScope: 'fiscal' | 'patrimonial'`** :
rejeté au profit d'une normalisation systématique sur "fiscal ou
patrimonial". Plus simple, et c'est la formulation la plus inclusive
(certains calcs étaient déjà sur cette variante).

## Suivi

- Les fichiers `src/types/<calc>.ts` et `src/lib/schema/schemaData.ts`
  ne sont pas touchés par cet ADR. Leur migration reste planifiée
  (cf. ADR-0001 §Suivi).
- Une règle ESLint `no-restricted-syntax` interdisant
  `toLocaleString('fr-FR')` hors de `src/lib/formatters.ts` pourrait
  protéger durablement le seam unifié. À ajouter à `.eslintrc` lors
  d'un prochain pass `update-config`.
- Le hook `useCalculator` ne couvre que 4/8 calcs aujourd'hui.
  Si à terme `useNumericInput` est refondu pour stocker directement
  dans `useSimStorage` (suppression du sync `useEffect`), les 4 calcs
  restants pourront adopter `useCalculator`.
