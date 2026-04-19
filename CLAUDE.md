# CLAUDE.md — Instructions pour Claude Code sur calcpatrimoine

Ce fichier est lu automatiquement par Claude Code à chaque session dans ce repo.
Il contient **tout** ce qui est nécessaire pour implémenter un nouveau calculateur
dans le respect du style, des conventions et de la ligne éditoriale du projet.

---

## 1. Contexte projet

**CalcPatrimoine** (`calcpatrimoine.fr`) est un site de calculateurs patrimoniaux
**gratuits et open-source** pour la France. Stack : Next.js 16 (App Router),
React 19, TypeScript strict, Tailwind, Framer Motion, Recharts.

**Le créateur** (Nicolas Barbier) est analyste-développeur COBOL/AS400 dans
l'assurance-vie. Le ton du projet est **technique, transparent, anti-conseil**.

**Le positionnement éditorial est strict et non-négociable** :

- Le site **informe**, il ne **conseille pas**.
- Aucune recommandation personnalisée. Jamais.
- Les résultats sont **factuels et comparatifs** : on calcule, on compare, on montre.
- On n'écrit **jamais** "vous devriez", "choisissez", "il est préférable".
- On écrit "l'option X aboutit à un impôt de Y€", "l'écart entre les deux est de Z€".
- Toute suggestion d'optimisation doit rester factuelle et conditionnelle
  ("**En fractionnant sur 2 ans, vous économiseriez X€**"), sans recommandation.

---

## 2. Règle d'or : respect de l'existant

Avant d'écrire la moindre ligne, **lis le code du calculateur le plus proche
thématiquement** de celui que tu vas implémenter. Calque :

- Le nommage (français pour la logique métier, conventions internes déjà établies).
- La structure des fichiers.
- Le style de commentaires (étapes numérotées, explications en français).
- Le format des résultats (warnings/optimisations, pattern non-directif).
- Les imports et l'arborescence.

**Ne réinvente rien.** Si une fonction utilitaire existe déjà (formatage de date,
calcul de durée, etc.), réutilise-la. Si une variable CSS / une classe Tailwind
est utilisée partout pour les cartes, les boutons, les warnings, utilise les
mêmes.

---

## 3. Architecture d'un calculateur

Un calculateur = **4 fichiers** qui suivent tous la même structure.

```
src/types/<domaine>.ts                          ← Interfaces Inputs / Results
src/lib/<domaine>.ts                            ← Logique pure (fonctions de calcul)
src/components/Calculator/<Nom>Calculator.tsx   ← UI React (saisie + affichage)
src/app/<slug>/page.tsx                         ← Page Next.js
docs/sources/<slug>.md                          ← Sources légales (NOUVEAU — voir §6)
```

### 3.1. Le fichier `types/<domaine>.ts`

Trois exports minimum :

- `<Domaine>Inputs` : ce que l'utilisateur saisit.
- `<Domaine>Results` : ce que le calcul renvoie.
- Tout type intermédiaire (`FiscaliteOption`, `Tranche`, etc.) nécessaire.

Le type `Results` doit inclure, quand pertinent :

```ts
warnings: Array<{ type: 'danger' | 'warning' | 'info'; message: string }>;
optimisations: Array<{ type: 'success' | 'info'; message: string; gain?: number }>;
```

### 3.2. Le fichier `lib/<domaine>.ts`

**Fonctions pures, sans effet de bord, sans React.** Une fonction principale
`calculer<Nom>(inputs: ...Inputs): ...Results` plus des helpers privés.

Conventions de style :

- Commentaires JSDoc en français sur chaque fonction exportée.
- Dans la fonction principale, **numéroter les étapes** dans les commentaires :
  ```ts
  // 1. Calcul ancienneté
  // 2. Calcul plus-value totale
  // 3. ...
  ```
- Constantes fiscales et seuils : soit inline avec commentaire citant la source
  (`// Art. 150-0 A CGI — PFU 12,8%`), soit dans `lib/constants.ts` si réutilisés.
- Aucune dépendance externe non justifiée. `date-fns` est dispo si utile.

### 3.3. Le composant `<Nom>Calculator.tsx`

Client component (`'use client'`). Structure attendue :

```tsx
'use client'

import { useState, useMemo } from 'react'
import { calculer<Nom> } from '@/lib/<domaine>'
import type { <Nom>Inputs } from '@/types/<domaine>'
// ... autres imports UI

export default function <Nom>Calculator() {
  const [inputs, setInputs] = useState<<Nom>Inputs>({ /* defaults raisonnables */ })
  const results = useMemo(() => calculer<Nom>(inputs), [inputs])

  return (
    // Panneau gauche : saisie
    // Panneau droit : résultats + warnings + optimisations
  )
}
```

Règles UI :

- **Calcul temps réel** (useMemo sur les inputs, pas de bouton "Calculer").
- **Montants formatés** en euros français : `n.toLocaleString('fr-FR')` suffixé par `€`.
- **Pourcentages** à 1-2 décimales selon le contexte.
- **Warnings danger** : bordure/fond rouge discret. **Warning** : orange. **Info** : bleu.
- **Optimisations success** : bordure/fond vert discret.
- **Pas d'icônes emoji dans le code source** (UTF-8 mojibake fréquent). Utilise
  `lucide-react` si besoin — mais il n'est pas encore installé, donc préfère des
  textes courts ou des badges Tailwind tant qu'on ne l'a pas ajouté.

### 3.4. La page `app/<slug>/page.tsx`

Server component par défaut (pas de `'use client'`). Structure :

```tsx
import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LegalDisclaimer from '@/components/LegalDisclaimer'
import <Nom>Calculator from '@/components/Calculator/<Nom>Calculator'

export const metadata: Metadata = {
  title: '<Titre SEO — h1 compris entre 50 et 60 caractères>',
  description: '<Meta description 140-160 caractères, factuelle, sans superlatif>',
}

export default function <Nom>Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Header />
      {/* Breadcrumb, H1, sous-titre */}
      <LegalDisclaimer />
      <<Nom>Calculator />
      {/* Section explications / méthodologie inline */}
      <Footer />
    </main>
  )
}
```

**N'oublie jamais `<LegalDisclaimer />` en haut du calculateur.** C'est non négociable.

---

## 4. Tests / validation (pragmatique)

Le repo n'a **pas encore** de framework de tests. Pour un nouveau calculateur,
la stratégie est :

1. **Cas de référence dans le code** : en fin de `lib/<domaine>.ts`, ajouter un
   commentaire JSDoc `/** @example */` avec 2-3 cas issus de sources officielles
   (ex: un exemple du BOFiP) avec valeurs attendues. Cela sert de documentation
   exécutable.
2. **Test manuel dans le navigateur** : `npm run dev`, saisir les cas de
   référence, vérifier que les résultats collent à ±1€ près.
3. **`npm run type-check`** doit passer sans erreur.
4. **`npm run lint`** doit passer (warnings acceptés si justifiés).
5. **`npm run build`** doit compiler sans erreur.

Si tu introduis un vrai framework de tests (vitest conseillé), fais-le dans un
commit dédié et **documente-le ici** en mettant à jour cette section.

---

## 5. Format du disclaimer par calculateur

Le `<LegalDisclaimer />` générique est toujours en haut. **En plus**, chaque
calculateur doit afficher, en bas de page ou dans une section "Méthodologie",
un **bloc sources** avec :

- Les articles de loi cités (CGI, Code des assurances, etc.) avec lien Légifrance.
- Les doctrines administratives (BOFiP, BOSS) avec lien officiel.
- La **date de dernière consultation** des sources.
- Le millésime fiscal applicable (ex: "Barème IR 2026 — revenus 2025").

Le fichier `docs/sources/<slug>.md` (voir §6) contient ces infos sous forme
structurée et sert de source unique pour le rendu.

---

## 6. Sourçage légal — obligation par calculateur

**Chaque nouveau calculateur nécessite un fichier `docs/sources/<slug>.md`** au
format suivant :

```markdown
# Sources — <Nom du calculateur>

**Dernière vérification** : YYYY-MM-DD
**Millésime fiscal** : Revenus <année> / Barème <année+1>

## Textes de loi

- **Article <numéro> du Code général des impôts** — <objet>
  URL Légifrance : https://www.legifrance.gouv.fr/...
  Extrait pertinent : "<citation courte — 1 phrase max>"

- **Article L.<...> du Code des assurances** — <objet>
  URL Légifrance : https://...

## Doctrine administrative

- **BOFiP BOI-<ref>** — <titre>
  URL : https://bofip.impots.gouv.fr/bofip/...
  Date publication : YYYY-MM-DD

- **BOSS <ref>** (si applicable)
  URL : https://boss.gouv.fr/...

## Barèmes et taux

| Paramètre | Valeur | Source | Date |
|-----------|--------|--------|------|
| Taux PFU IR | 12,8 % | Art. 200 A CGI | 2026 |
| Prélèvements sociaux | 17,2 % | Art. L.136-6 CSS | 2026 |

## Exemples de référence

Cas chiffrés issus de sources officielles pour validation :

### Exemple 1 (source : BOFiP BOI-...)
- Inputs : ...
- Résultat attendu : ...

## Notes et limites connues

- Ce calculateur ne traite pas : <cas non gérés explicitement>
- Il suppose : <hypothèses simplificatrices>
```

**Règles de sourçage strictes** :

- **Tout taux, tout seuil, tout barème doit avoir une source primaire.**
- Priorité : Légifrance > BOFiP / BOSS > service-public.fr > impots.gouv.fr.
- **Pas de source secondaire** (blogs fiscaux, articles de presse, IA). Jamais.
- Les citations sont **très courtes** (une phrase, moins de 15 mots) ou en
  reformulation. Jamais de paragraphe entier copié.
- La date de consultation est obligatoire.
- Si un texte a été modifié récemment, signaler la version applicable
  (ex: "Version issue de la LF 2026").

---

## 7. Workflow pour un nouveau calculateur

**Toujours dans cet ordre :**

1. **Lire `BACKLOG.md`** → choisir le premier item en statut `todo`, priorité
   la plus haute. Passer son statut à `in-progress`.
2. **Rechercher et vérifier les textes de loi** en vigueur à la date du jour.
   Créer `docs/sources/<slug>.md` avec les sources.
3. **Définir les types** dans `src/types/<domaine>.ts`.
4. **Écrire la logique pure** dans `src/lib/<domaine>.ts` avec JSDoc et cas
   de référence en `@example`.
5. **Valider mentalement** contre les exemples officiels du BOFiP (simulation
   à la main).
6. **Construire le composant** `src/components/Calculator/<Nom>Calculator.tsx`.
7. **Créer la page** `src/app/<slug>/page.tsx` avec metadata SEO, disclaimer,
   section sources.
8. **Ajouter la route au `Header.tsx` / au menu** si pertinent.
9. **Ajouter au `sitemap.ts`**.
10. **Vérifier** : `npm run type-check`, `npm run lint`, `npm run build`.
11. **Commit atomique** : `feat(calc): ajout calculateur <nom>`.
12. **Passer le statut à `done` dans `BACKLOG.md`** avec la date.

La slash-command `/nouveau-calculateur` déclenche exactement ce workflow.

---

## 8. Conventions Git

- Branches : `feat/calc-<slug>`, `fix/<slug>`, `docs/<sujet>`.
- Messages : préfixe conventional commits en français — `feat(calc):`,
  `fix(ui):`, `docs(sources):`, `chore(deps):`.
- **Commits atomiques** : un calculateur = un gros commit bien décrit, ou
  plusieurs commits découpés proprement (types / logique / UI / page).
- **Pas de fichiers de brouillon** dans les commits. Pas de `test_xxx.js` à la
  racine — si besoin de scratch, utiliser `/tmp`.

---

## 9. Ce qu'on **ne fait pas**

- Pas de recommandation personnalisée, jamais.
- Pas d'appel d'API externe payante ou à risque de changement (tout en local).
- Pas de `localStorage` / `sessionStorage` sauf nécessité explicite.
- Pas de dépendance JS sans justification claire.
- Pas de barème périmé. Si tu n'es pas sûr de la date d'applicabilité, **tu
  vérifies avant de coder**.
- Pas de "quick win" qui contourne le sourçage. Si tu ne trouves pas la source
  officielle, tu documentes le manque dans `docs/sources/<slug>.md` et tu
  demandes à Nicolas avant de publier.
- Pas d'emoji dans le code source (utiliser du texte ou des badges).
- Pas d'ajout de calculateur qui ne figure pas dans `BACKLOG.md`. Si tu as une
  idée, tu la proposes en l'ajoutant à la backlog avec statut `proposed`,
  et tu attends validation.

---

## 10. Mode autonome

La slash-command `/mode-autonome` enchaîne `/nouveau-calculateur` en boucle sur
la backlog. Entre chaque calculateur :

- Faire un `git status` et vérifier qu'on est clean.
- Relire la backlog (elle a pu être mise à jour).
- S'arrêter si la backlog est vide OU si 3 calculateurs consécutifs ont été
  produits (demander validation humaine).

**Règle de sécurité** : si un doute existe sur un point fiscal, **s'arrêter et
demander**, ne pas deviner. Mieux vaut livrer 1 calculateur juste que 3
approximatifs.

---

## 11. Pour aller plus loin

- `BACKLOG.md` — liste priorisée des calculateurs.
- `docs/CONVENTIONS_CALCULATEUR.md` — détail technique complet (extension de §3).
- `docs/sources/` — sources légales par calculateur.
- `.claude/commands/` — slash-commands personnalisées.

Last updated: 2026-04-19.
