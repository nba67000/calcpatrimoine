# ADR-0003 - Extraction module fiscal partagé + composant MethodologieSection

**Statut** : Accepté
**Date** : 2026-06-01

## Contexte

Le scan `/improve-codebase-architecture` du 2026-06-01 (déclenché après
l'ajout de 10 nouveaux calculateurs en une session) a identifié deux
frictions architecturales nouvelles ou amplifiées :

### Friction 1 , Duplication des barèmes fiscaux Art. 777 CGI

Les calculateurs `donation`, `succession`, `donationDemembrement` et
`pretIntrafamilial` réécrivent tous le même barème par tranches Art. 777
CGI et les abattements Art. 779 CGI. Chaque lib a sa propre :
- Constante `BAREME_LIGNE_DIRECTE: Tranche[]` (mots-pour-mots identique).
- Constante `ABATTEMENTS: Record<Lien, number>` (mêmes valeurs).
- Fonction `appliquerBareme(base, tranchesConsommees, bareme)` (même
  algorithme).

**Anti-locality** : un changement législatif (loi de finances) impose 4
patches identiques. Un développeur qui corrige une erreur arrondi dans le
calcul a 4 endroits à toucher.

### Friction 2 , Pattern méthodologie répété sur ~15 pages calc

Depuis ADR-0002, chaque page calc passe une prop `methodologie={...}` au
layout. Mais le contenu de cette prop est **lui-même répétitif** :

```tsx
<>
  <SourcesSection slug="..." />
  <div>
    <h3>Limites connues</h3>
    <ul>{LIMITES.map(...)}</ul>
  </div>
  <div className="border-l-4 border-primary-200 ...">
    <p>Barème ... Sources ...</p>
  </div>
</>
```

~25 lignes de JSX identique × 15 pages = ~375 lignes répétées. Si on
change la structure visuelle (ex. déplacer "Limites" avant "Sources"),
il faut éditer 15 fichiers.

## Décision

### Extraction 1 , `src/lib/fiscal/baremesArt777.ts`

Module unique exposant :

```ts
export const BAREME_LIGNE_DIRECTE: Tranche[]
export const BAREME_EPOUX_PACS: Tranche[]
export const BAREME_FRERE_SOEUR: Tranche[]
export const BAREME_NEVEU_NIECE: Tranche[]
export const BAREME_NON_PARENT: Tranche[]

export const ABATTEMENTS_ART_779: Record<string, number>
export const ABATTEMENT_PETIT_ENFANT_SUCCESSION
export const ABATTEMENT_DEFAUT_ART_788
export const ABATTEMENT_HANDICAP
export const ABATTEMENT_790G

export function appliquerBareme(
  baseTaxable: number,
  tranchesConsommees: number,
  bareme: Tranche[],
): { droits: number; detail: TrancheAppliquee[] }

export function getBaremePourLien(lien: LienFiscal): Tranche[]
```

Le type `LienFiscal` est l'union des string-literals des enums consommateurs
(`LienParente`, `LienHeritier`, `LienEmprunteur`) , compatible via valeur.

**Refactorings** :
- `src/lib/succession.ts` : importe + utilise `appliquerBareme`/`getBaremePourLien`.
  Conserve son `getBareme` local pour le cas particulier conjoint exonéré
  TEPA (qui doit retourner ligne directe par sécurité même si jamais appliqué).
- `src/lib/pretIntrafamilial.ts` : supprime ~50 lignes (`tauxDroitsLigneDirecte` +
  `tauxDroitsAutreLien`) → fonction `calculerDroits(base, lien)` d'une ligne.
- `src/lib/donationDemembrement.ts` : supprime ~75 lignes (`appliquerBaremeLigneDirecte`
  + `appliquerBaremeEpoux` + `appliquerBareme`) → `calculerDroits()` d'une ligne.
- `src/lib/donation.ts` : **non touché** dans cette session (stable, hors scope
  refactor). Reste candidat pour une consolidation ultérieure si besoin.

### Extraction 2 , `src/components/MethodologieSection.tsx`

Composant standardisé avec props :
- `slug: string` (requis) → résout SourcesSection auto via registry.
- `limites?: string[]` → rend section "Limites connues" + ul.map. Support
  markdown gras `**texte**` → `<strong>`.
- `note?: ReactNode` → bandeau primary discret.
- `extra?: ReactNode` → slot libre pour tableau spécifique (ex. barème
  Art. 669 dans donation-démembrement, barème CSG dans csg-retraite).

**Refactorings** (5 pages au premier batch) :
- `src/app/succession/page.tsx`
- `src/app/per-sortie/page.tsx`
- `src/app/pret-intrafamilial/page.tsx`
- `src/app/plus-value-immobiliere/lmnp/page.tsx`
- `src/app/pea/page.tsx`
- `src/app/lmnp-reel-vs-micro/page.tsx`

Chaque page passe de ~25 lignes JSX inline à ~12 lignes (un appel à
`<MethodologieSection slug={...} limites={LIMITES} note={...} />`).

Pages avec spécificités non encore refactorées :
- `donation/demembrement/page.tsx` : tableau Art. 669 inline → à passer via
  prop `extra`.
- `csg-csds-retraite/page.tsx` : tableau barème CSG inline → idem.
- `comparateur-locatif-placement/page.tsx` : bandeau amber custom (différent
  du primary) → conservée telle quelle.
- `sci-is-vs-ir/page.tsx` : bandeau amber custom → conservée.

## Raison

**Deep > shallow.** Les deux extractions concentrent du comportement
(calcul fiscal, structure visuelle) au seul endroit qui en a la
responsabilité.

**Locality.** Pour comprendre "comment fonctionne le barème Art. 777", on
lit `src/lib/fiscal/baremesArt777.ts` (et un test). Pour comprendre "à
quoi ressemble une section méthodologie", on lit `MethodologieSection.tsx`.

**Leverage.** Un changement de loi de finances → édition d'un seul fichier
(au lieu de 4). Un changement de structure visuelle de la méthodologie →
édition d'un seul composant (au lieu de 15 pages).

**Test surface.** Le module fiscal a son propre fichier de test (10 cas
couvrant barème, rappel 15 ans, immutabilité). Le composant
`MethodologieSection` est snapshot-testable indépendamment.

## Alternatives rejetées

**Refactor donation.ts dans la même session** : envisagé. Rejeté car
donation.ts a un comportement spécifique (cumul abattement personnel +
790G, condition d'âge donateur, etc.) qui complique le mapping vers les
fonctions du module fiscal. À reprendre dans une session dédiée si la
valeur en justifie le risque.

**Composant générique `<CalculatorMethodologyLayout>` (V2)** : étendre
encore plus l'absorption en factorisant aussi le bandeau date + la mise
en page. Rejeté : trop de variation (`comparateurLocatif` et `sciRegime`
utilisent un bandeau amber custom, justifié par leur statut V1 prudent).
Le composant actuel reste simple ; les pages avec spécificités gardent
leur custom.

**Refactor pages 7+ avec `extra` prop** : applicable à `donation/demembrement`
et `csg-csds-retraite` (qui ont tableaux spécifiques). À faire dans un
prochain commit dédié , pas bloquant.

## Conséquences

- Le code des libs fiscales perd ~150 lignes de duplication.
- Les pages calc gagnent en lisibilité (~25 → 12 lignes par méthodologie).
- Le module `baremesArt777` devient le point de référence canonique pour
  toute future logique fiscale CGI 777/779 (succession, donation, prêt
  familial).
- ADR-0001 §Suivi reste valide (migration `types/` → `lib/`, migration
  `schemaData.ts` , non touchés).

## Suivi

- Refactorer `donation.ts` pour utiliser le module fiscal (gain
  symétrique avec les 3 autres libs).
- Refactorer pages restantes (donation/demembrement, csg-csds-retraite)
  via la prop `extra` de `MethodologieSection`.
- Si une 3e couche de duplication émerge (warnings/optimisations
  répétitives dans les libs), envisager un module `fiscal/warnings.ts`
  avec des helpers `warnRappel15Ans()`, `warnDeficitFoncier()`, etc.
- Pas nécessaire pour cette session.
