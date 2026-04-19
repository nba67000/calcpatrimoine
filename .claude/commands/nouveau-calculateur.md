---
description: Implémente un nouveau calculateur de bout en bout, en suivant le workflow défini dans CLAUDE.md §7.
---

# /nouveau-calculateur

Tu vas implémenter **un seul** calculateur de A à Z. Tu suis le workflow
défini dans `CLAUDE.md` §7 sans dévier.

## Étapes à suivre dans l'ordre

### 1. Lire la backlog et choisir

- Lire `BACKLOG.md`.
- Sélectionner le **premier item en statut `todo`** dont la priorité est la
  plus haute (P1 > P2 > P3). Si plusieurs P1 `todo`, prendre le premier dans
  l'ordre du fichier.
- **Mettre à jour son statut à `in-progress`** immédiatement, avec la date
  du jour.
- Annoncer à l'utilisateur : "Je commence le calculateur `<slug>` — <nom>.
  Estimation : <X> étapes, <Y> fichiers."

### 2. Recherche des sources légales

- **Utiliser WebFetch** pour vérifier les articles de loi et barèmes sur
  Légifrance et BOFiP. **Ne pas s'en remettre à la mémoire du modèle** pour
  les chiffres — toujours vérifier la version en vigueur.
- URLs à privilégier (du plus fiable au moins fiable) :
  1. `legifrance.gouv.fr`
  2. `bofip.impots.gouv.fr`
  3. `boss.gouv.fr` (pour la protection sociale)
  4. `service-public.fr` (dernier recours — confirme les chiffres mais citer
     la source primaire dans le code)
- **Créer `docs/sources/<slug>.md`** selon le template de `CLAUDE.md` §6.
- Lister au moins 3 cas chiffrés de référence venant de sources officielles
  (exemples BOFiP, cas types service-public).

### 3. Types

- Lire `src/types/<domaine-proche>.ts` pour calquer le style.
- Créer ou étendre `src/types/<domaine>.ts`.
- Inclure au minimum : `<Nom>Inputs`, `<Nom>Results`, les types intermédiaires,
  et les structures `warnings` / `optimisations` standards.

### 4. Logique pure

- Lire `src/lib/<domaine-proche>.ts` pour calquer le style.
- Créer `src/lib/<domaine>.ts` avec :
  - JSDoc en français sur toutes les fonctions exportées.
  - Commentaires `// 1. ... // 2. ...` pour les étapes de la fonction principale.
  - Commentaire source pour chaque constante fiscale (`// Art. X CGI`).
  - Au moins 2 exemples de référence en JSDoc `@example` avec valeurs
    attendues issues des cas identifiés en étape 2.

### 5. Auto-validation

- **Simuler mentalement** chaque exemple de référence : la fonction doit
  retourner exactement les valeurs attendues (tolérance ±1 € sur les arrondis).
- Si un écart est constaté, corriger avant de continuer.
- **Si tu n'arrives pas à reproduire un cas officiel, t'arrêter et demander**.

### 6. UI — composant calculateur

- Lire un composant existant (`AssuranceVieCalculator.tsx` pour la mise en
  page deux colonnes, `RenteCalculator.tsx` pour les sliders).
- Créer `src/components/Calculator/<Nom>Calculator.tsx`.
- Pattern : `useState` pour les inputs, `useMemo` pour le calcul, deux
  colonnes responsive.
- Rendu des warnings / optimisations selon la convention Tailwind des
  `CONVENTIONS_CALCULATEUR.md`.

### 7. Page

- Lire `src/app/assurance-vie/fiscalite-rachat/page.tsx` (ou équivalent) pour
  calquer la structure.
- Créer `src/app/<slug>/page.tsx` avec :
  - Metadata complète (title, description, openGraph).
  - Breadcrumb.
  - H1 + sous-titre.
  - `<LegalDisclaimer />` au-dessus du calculateur.
  - Le composant calculateur.
  - Sections SEO sous le fold : "Comment ça marche", "Formule", "Exemples",
    FAQ si pertinent.
  - Section "Sources" reprenant `docs/sources/<slug>.md` (via
    `<CalculatorSources>` si le composant existe déjà, sinon inline
    pour l'instant et on factorisera).

### 8. Intégration

- Ajouter le lien dans `src/components/Header.tsx` si la navigation principale
  doit le contenir (vérifier la convention actuelle — P1 oui, P2/P3 en
  "sous-menu" ou footer).
- Ajouter l'URL dans `src/app/sitemap.ts`.

### 9. Vérifications

Lancer dans l'ordre, corriger au fur et à mesure :

```bash
npm run type-check
npm run lint
npm run build
```

**Tous doivent passer.** Si un échec semble impossible à corriger rapidement,
s'arrêter et demander.

### 10. Commit

- Un seul commit (ou plusieurs atomiques bien découpés : types / lib / UI /
  page / docs).
- Message : `feat(calc): ajout calculateur <slug>` avec description courte
  dans le corps.
- **Ne pas pousser automatiquement.** C'est Nicolas qui décide quand pousser.

### 11. Fermeture

- Mettre à jour `BACKLOG.md` : statut `in-progress` → `done` avec la date.
- Résumer ce qui a été fait à l'utilisateur : fichiers créés, sources
  utilisées, points de vigilance éventuels, commande pour lancer
  `npm run dev` et tester.
- **S'arrêter.** Ne pas enchaîner sur un autre calculateur sauf si
  `/mode-autonome` a été invoquée.

---

## Règles de sécurité

- **Doute sur un chiffre fiscal** → s'arrêter, demander à Nicolas.
- **Source non trouvée** → ne pas inventer, documenter le manque dans
  `docs/sources/<slug>.md`, demander.
- **Build qui échoue malgré 2 tentatives de fix** → s'arrêter, résumer
  l'erreur, demander.
- **Fichier existant qui semble entrer en conflit** → s'arrêter, montrer
  le fichier, demander.

Mieux vaut 1 calculateur juste que 3 approximatifs.
