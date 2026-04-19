# Conventions d'implémentation d'un calculateur

Ce document complète `CLAUDE.md` §3. Il détaille les choix techniques et
stylistiques attendus pour chaque nouveau calculateur.

---

## 1. Organisation des fichiers

Pour un calculateur de slug `<slug>` (ex: `tmi`, `per/fiscalite-versement`) :

```
src/
├── types/<domaine>.ts              ← Un fichier par domaine fiscal, pas par calculateur
├── lib/<domaine>.ts                ← Logique pure, groupée par domaine
├── components/Calculator/
│   └── <Nom>Calculator.tsx         ← Un composant par UI proposée
└── app/<slug>/
    ├── page.tsx                    ← Page principale
    └── <sous-slug>/page.tsx        ← Sous-pages si le calculateur a plusieurs modes
docs/sources/<slug>.md              ← Sources légales
```

**Domaine vs calculateur** : un "domaine" peut avoir plusieurs calculateurs
(ex: `assurance-vie` a `fiscalite-rachat` et `transmission`). Le fichier de
types et de lib est partagé.

---

## 2. Style TypeScript

### Types

- **Préférer `type` à `interface`** pour les formes de données pures. `interface`
  acceptée pour les contrats publics ré-étendables.
- **Types littéraux** pour les enums simples : `type TMI = 0 | 11 | 30 | 41 | 45`.
- **Documentation inline** sur les champs pas évidents :
  ```ts
  export type TmiInputs = {
    revenuNetImposable: number;  // Après abattement 10% et charges déductibles
    nombreParts: number;         // Au sens fiscal (1, 1.5, 2, 2.5, ...)
  }
  ```

### Fonctions

- **Toujours typer explicitement le retour** des fonctions exportées.
- **Pas de `any`**. `unknown` si vraiment inconnu, sinon type précis.
- **Fonctions pures** : aucune dépendance à `Date.now()` sauf si la fonction est
  dédiée à ça. Pour les calculs liés au temps, passer la date en paramètre :
  ```ts
  // Bien : testable
  function calculerAnciennete(dateOuverture: Date, dateReference: Date = new Date())
  
  // Mal : pas testable
  function calculerAnciennete(dateOuverture: Date) {
    const aujourdhui = new Date()
    ...
  }
  ```

### Commentaires

- **JSDoc en français** sur chaque fonction exportée.
- **Étapes numérotées** dans la fonction principale :
  ```ts
  export function calculerTmi(inputs: TmiInputs): TmiResults {
    // 1. Quotient familial
    const quotient = inputs.revenuNetImposable / inputs.nombreParts
    
    // 2. Application du barème progressif
    const irParPart = appliquerBareme(quotient, BAREME_2026)
    
    // 3. IR théorique = IR par part × nombre de parts
    const irTheorique = irParPart * inputs.nombreParts
    
    // 4. Plafonnement du quotient familial (si applicable)
    ...
    
    // 5. Décote
    ...
  }
  ```
- **Citer la source en commentaire** pour chaque taux / seuil magique :
  ```ts
  const PFU_IR = 0.128        // Art. 200 A CGI — 12,8%
  const PRELEVEMENTS_SOCIAUX = 0.172  // CSG 9,2 + CRDS 0,5 + PS 7,5 — Art. L.136-6 CSS
  ```

---

## 3. Style React / Tailwind

### Imports

Ordre attendu en haut des composants :

```tsx
'use client'

// 1. React et hooks
import { useState, useMemo } from 'react'

// 2. Librairies externes
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

// 3. Composants internes (alias @/)
import Tooltip from '@/components/Tooltip'
import RangeSlider from '@/components/RangeSlider'

// 4. Lib et types
import { calculerTmi } from '@/lib/tmi'
import type { TmiInputs, TmiResults } from '@/types/tmi'
```

### Structure du JSX

Pattern attendu, deux colonnes (responsive) :

```tsx
return (
  <section className="max-w-6xl mx-auto px-4 py-8">
    <div className="grid lg:grid-cols-2 gap-8">
      
      {/* Colonne gauche : saisies */}
      <div className="space-y-6">
        <h2>Vos informations</h2>
        {/* Inputs groupés logiquement, chaque groupe dans une card */}
      </div>
      
      {/* Colonne droite : résultats */}
      <div className="space-y-6">
        <h2>Votre résultat</h2>
        {/* Cards de résultats, warnings, optimisations */}
      </div>
      
    </div>
  </section>
)
```

### Formatage

Utilitaires à créer dans `lib/format.ts` si pas encore existants :

```ts
export const formatEuros = (n: number, decimals = 0) =>
  n.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + ' €'

export const formatPourcent = (n: number, decimals = 1) =>
  n.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + ' %'
```

Vérifier avant d'ajouter : ces utilitaires existent peut-être déjà dans le
repo (à l'instant de l'écriture, `toLocaleString('fr-FR')` est utilisé
directement, voir `assuranceVie.ts`). Si on décide de factoriser, le faire
dans un commit dédié.

### Classes Tailwind récurrentes

Convention visuelle existante à respecter :

- **Card standard** : `bg-white border border-neutral-200 rounded-lg p-6 shadow-sm`
- **Card mise en avant** : `bg-primary-50 border-2 border-primary-200 rounded-lg p-6`
- **Warning danger** : `bg-red-50 border border-red-200 text-red-900`
- **Warning warning** : `bg-orange-50 border border-orange-200 text-orange-900`
- **Warning info** : `bg-blue-50 border border-blue-200 text-blue-900`
- **Optimisation success** : `bg-green-50 border border-green-200 text-green-900`
- **Titres** : `text-2xl font-bold text-neutral-900` (h2), `text-xl font-semibold` (h3)
- **Texte secondaire** : `text-sm text-neutral-600`

---

## 4. SEO

### Metadata

Chaque page de calculateur doit avoir :

```tsx
export const metadata: Metadata = {
  title: 'Titre H1 court | CalcPatrimoine',
  description: '140-160 caractères, factuel, avec le verbe d\'action (calculer, simuler, estimer) et au moins un chiffre/bénéfice.',
  openGraph: {
    title: '...',
    description: '...',
    type: 'website',
  },
}
```

### Contenu sur la page

En plus du calculateur, une page doit contenir, sous le fold :

1. **Section "Comment ça marche"** — 3-5 étapes, prose courte.
2. **Section "Formule utilisée"** — la formule mathématique + explication.
3. **Section "Exemples"** — 2-3 cas chiffrés pris du BOFiP / de sources
   officielles.
4. **Section "FAQ"** (optionnelle, selon volume de recherches) — 4-6
   questions avec réponses courtes.
5. **Bloc "Sources"** — réutilisant `docs/sources/<slug>.md` (voir §5).

### Schema.org

Si la page a une FAQ, utiliser `<SchemaMarkup>` existant (déjà dans le repo)
avec le type `FAQPage`.

### Sitemap

**Toujours** ajouter la nouvelle URL dans `src/app/sitemap.ts`. Claude Code
doit le faire automatiquement à l'étape 9 du workflow.

---

## 5. Bloc sources sur la page

Créer un composant léger réutilisable (si pas encore existant) :

```tsx
// src/components/CalculatorSources.tsx
type Source = {
  type: 'loi' | 'bofip' | 'boss' | 'autre'
  ref: string          // ex: "Art. 150 U CGI"
  titre: string
  url: string
}

export default function CalculatorSources({
  sources,
  dateVerification,
  millesime,
}: {
  sources: Source[]
  dateVerification: string  // YYYY-MM-DD
  millesime: string         // ex: "Revenus 2025 / Barème 2026"
}) {
  // Rendu : liste d'URLs avec badges par type, date, millésime
}
```

À créer dans un commit préalable à l'ajout des nouveaux calculateurs, car
tous en auront besoin.

---

## 6. Accessibilité minimale

- Tous les `<input>` ont un `<label htmlFor>` associé.
- Les sliders ont `aria-label` et `aria-valuenow` / `aria-valuemin` / `aria-valuemax`.
- Les couleurs utilisées pour distinguer les états (warning/success) sont
  toujours accompagnées d'un texte ou d'une icône.
- Les titres respectent la hiérarchie (un seul H1 par page, puis H2, H3...).

---

## 7. Performance

- **Calcul en `useMemo`** pour éviter de recalculer à chaque re-render.
- **Pas de librairie lourde** pour un gain marginal. Si besoin d'un graphe,
  utiliser `recharts` qui est déjà installé.
- **Lazy-loading** pour les composants lourds (graphiques, tableaux) avec
  `dynamic(() => import('...'), { ssr: false })` si nécessaire.
- **Cible Lighthouse mobile** : 95+. Vérifier après chaque calculateur ajouté.

---

## 8. Checklist avant commit

- [ ] `docs/sources/<slug>.md` rempli et cohérent
- [ ] Types dans `src/types/<domaine>.ts`
- [ ] Logique pure dans `src/lib/<domaine>.ts` avec JSDoc et @example
- [ ] Composant `<Nom>Calculator.tsx` avec disclaimer
- [ ] Page `app/<slug>/page.tsx` avec metadata, sections SEO, sources
- [ ] Lien ajouté dans `Header.tsx` ou menu si applicable
- [ ] URL ajoutée dans `sitemap.ts`
- [ ] `npm run type-check` OK
- [ ] `npm run lint` OK (warnings justifiés acceptés)
- [ ] `npm run build` OK
- [ ] `BACKLOG.md` mis à jour (`todo` → `done` avec date)
- [ ] Commit atomique avec message conventional commit en français
