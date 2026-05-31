# CONTEXT.md - Vocabulaire domaine CalcPatrimoine

Ce fichier liste le vocabulaire **métier** et **architectural** utilisé dans
le code. Tout terme utilisé dans une discussion d'architecture, un ADR, ou
un nom de module doit figurer ici. Les skills (`/improve-codebase-architecture`,
`/nouveau-calculateur`, etc.) lisent ce fichier avant toute proposition.

---

## Métier

### Calculateur

Un **calculateur** est un outil de simulation patrimoniale autonome publié
sur calcpatrimoine.fr. Chaque calculateur traite un sujet fiscal ou
patrimonial précis (TMI, donation, IFI, etc.).

Chaque calculateur a :
- un **slug** unique (ex. `tmi`, `donation/droits`, `assurance-vie/transmission`),
- des **Inputs** (ce que l'utilisateur saisit),
- des **Results** (ce que le calcul renvoie),
- des **sources légales** (articles CGI, BOFiP, etc.),
- un **format de contexte chat** (pour le chatbot),
- un **schéma SEO** (FAQ + HowTo en JSON-LD).

### Abattement

Montant retiré de la base imposable avant application du barème.
Ex. : 100 000 € par parent et par enfant (Art. 779-I CGI).

### Barème par tranches

Tableau de taux progressifs appliqués à la base taxable.
Chaque tranche ne taxe que la part du montant qui tombe dans sa fourchette.

### Warning / Optimisation

Alertes affichées à l'utilisateur après calcul :
- **warning** (`danger | warning | info`) signale un risque, un seuil
  dépassé, ou un point d'attention.
- **optimisation** (`success | info`) chiffre une réduction d'impôt
  conditionnelle, en formulation factuelle (non-conseil).

### Rappel fiscal des 15 ans

Règle de l'Art. 784 CGI : les donations consenties au même donataire dans
les 15 dernières années sont prises en compte dans le nouveau calcul
(abattement résiduel + tranches déjà consommées).

### Source légale

Référence à un texte officiel : article CGI, BOFiP, BOSS, service-public.
Toute constante fiscale (taux, seuil, abattement) doit citer sa source
dans le code (commentaire JSDoc ou inline).

---

## Architectural

### Module calculateur

Tout ce qui définit un calculateur est exporté depuis un **seul** fichier
`src/lib/<calc>.ts` sous la forme d'un objet conforme à l'interface
`CalculatorModule` (voir `src/lib/calculators/types.ts`). Le module
embarque : slug, sources légales, FAQ schema, HowTo schema, et
`formatContexteChat`.

### Calculator registry

Un collecteur unique (`src/lib/calculators/index.ts`) qui agrège tous les
modules calculateur. Les composants qui dispatcheraient autrement par
slug (ChatWidget, SourcesSection, pages calculateur) interrogent le
registry via `getCalculator(slug)`.

Le registry remplace les anciens modules de wiring `chatContext.ts` et
`sourcesRegistry.ts` (supprimés - voir ADR-0001).

### Pure lib

Fonction de calcul sans effet de bord ni dépendance React. Vit dans
`src/lib/<calc>.ts`. La fonction principale est `calculer<Nom>(inputs)`.

### Calculator UI

Composant React client (`src/components/Calculator/<Nom>Calculator.tsx`)
qui gère l'état d'entrée, appelle la pure lib via `useMemo`, et rend les
résultats. Toujours nommé `<Nom>Calculator`.

Pour les calculateurs dont les inputs persistés correspondent **directement**
au shape des Inputs de la lib (pas de couche `useNumericInput`), utiliser
le hook [[useCalculator]] qui absorbe le triplet
`useSimStorage + useMemo(compute) + useEffect(saveSimHistory)`.

### useCalculator

Hook (`src/hooks/useCalculator.ts`) qui factorise la mécanique d'état des
Calculator UI standard : persistance (`useSimStorage`), computation
(`useMemo`), enregistrement dans l'historique (`useEffect` +
`saveSimHistory`). Retourne `{ inputs, setInputs, reset, results }`.
S'applique aux calcs dont les Inputs persistés = Inputs de la lib
(IFI, AssuranceVie/rachat, Transmission, PlusValueImmobiliere).
Cf. ADR-0002.

### Calculator page

Server component (`src/app/<slug>/page.tsx`) qui assemble le calculateur :
metadata SEO, breadcrumb, et le composant Calculator. Le layout
[[CalculateurPageLayout]] absorbe automatiquement : `<LegalDisclaimer>`,
les schémas SEO (`SchemaFAQ` + `SchemaHowTo` résolus via le registry),
le footer disclaimer, et le wrapper de la section "Méthodologie et
sources officielles" (passée via la prop `methodologie`).

### Seam d'extension

Pour ajouter un calculateur, un seul fichier de wiring doit être édité :
`src/lib/calculators/index.ts` (1 import + 1 entrée). `navigation.ts`
reste édité séparément car il porte des métadonnées d'UX (catégorie
visible, ordre dans le menu, description courte) qui sont distinctes
du comportement du calculateur lui-même.

### CalculateurPageLayout

Layout React (`src/components/CalculateurPageLayout.tsx`) consommé par
toutes les pages calculateur. Au-delà du chrome (Header, hero,
breadcrumb, RelatedCalcSection, Footer), il absorbe automatiquement
ce qui se déduit du `currentHref` :

- les schémas SEO `SchemaFAQ` + `SchemaHowTo` (résolus via `getCalculator(slug)`),
- le `LegalDisclaimer` au-dessus du calculateur,
- le wrapper standardisé de la section "Méthodologie et sources officielles"
  (H2 + container + footer disclaimer "Outil indicatif…") via la prop
  `methodologie?: ReactNode`.

Cf. ADR-0002.

---

## Conventions de nommage

- Fichiers lib : `camelCase` (`plusValueImmobiliere.ts`, pas
  `plus-value-immobiliere.ts`).
- Slugs URL : `kebab-case` (`/plus-value-immobiliere`, `/donation/droits`).
- Types Inputs/Results : `PascalCase` suffixé (`TMIInputs`, `TMIResults`).
  Vivent actuellement dans `src/types/<calc>.ts`. Une migration vers
  `src/lib/<calc>.ts` est documentée comme suivi de l'ADR-0001 mais
  reportée (impact 22 importeurs).
- Constante module exporté : `module<Calc>` (ex. `moduleTmi`,
  `moduleDonation`).
- Constante sources : `SOURCES_<CALC>` (ex. `SOURCES_TMI`, conservée pour
  rétrocompatibilité, ré-exportée par le module).

---

## Glossaire architectural (raccourci LANGUAGE.md du skill)

- **Module** : interface + implémentation.
- **Interface** : tout ce qu'un appelant doit savoir.
- **Depth** : leverage à l'interface (peu d'interface, beaucoup de
  comportement derrière).
- **Shallow** : interface presque aussi complexe que l'implémentation.
- **Seam** : endroit où une interface vit ; où le comportement peut
  être altéré sans éditer en place.
- **Deletion test** : si on supprime le module, est-ce que la complexité
  disparaît (= pass-through) ou réapparaît concentrée ailleurs (= gagnait
  sa place) ?
- **Locality** : pour comprendre/modifier un concept, combien d'endroits
  doit-on lire ?
- **Leverage** : ce que les appelants gagnent de la profondeur.
