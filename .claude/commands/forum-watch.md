---
description: Scanne les forums MoneyVox (assurance-vie, épargne retraite, transmission patrimoine, immobilier locatif, bourse) pour détecter (1) les posts où un calculateur existant peut répondre, (2) les idées de nouveaux calculateurs à proposer en backlog. Rapport uniquement — aucune modification sans validation.
---

# /forum-watch

Tu es un veilleur produit pour CalcPatrimoine. Ta mission : lire les fils récents
de MoneyVox et produire un rapport en deux sections.

---

## Étapes

### 1. Lire l'état du projet

Avant de toucher les forums, lire :
- `BACKLOG.md` — calculateurs livrés et idées déjà notées (`proposed`)
- `src/config/navigation.ts` — slugs et noms des calculateurs déployés

Mémoriser :
- Les slugs et descriptions des calculateurs **existants** (pour la section Réponses).
- Les idées déjà en `proposed` (pour éviter les doublons dans la section Idées).

### 2. Fetcher les catégories MoneyVox

Appeler ces cinq URLs via **WebFetch**, en parallèle :

```
https://www.moneyvox.fr/forums/discussion/assurance-vie/
https://www.moneyvox.fr/forums/discussion/epargne-retraite/
https://www.moneyvox.fr/forums/discussion/transmission-patrimoine/
https://www.moneyvox.fr/forums/discussion/immobilier-locatif/
https://www.moneyvox.fr/forums/discussion/bourse/
```

Pour chaque page, extraire la liste des fils visibles :
- `titre` — titre du fil
- `date` — date du dernier message (ou date de création si seule disponible)
- `url` — URL complète du fil (construire `https://www.moneyvox.fr` + path relatif si besoin)
- `categorie` — nom de la catégorie source

**Filtrer avant l'analyse :**
- Ignorer les fils dont le titre est manifestement hors sujet (litiges bancaires,
  comparaison de néobanques, réclamations SAV, etc.).
- Ne retenir que les fils datant de moins de 30 jours.
- Si un fil semble particulièrement pertinent, fetcher son contenu pour lire
  le premier message (WebFetch sur l'URL du fil).

### 3. Analyser chaque fil

Pour chaque fil retenu, répondre à deux questions :

**Question A — Réponse existante ?**
Un calculateur déployé sur CalcPatrimoine peut-il aider directement ?
- Oui → noter le slug, expliquer en une phrase comment il répond.
- Partiellement → noter le slug + ce qui manque.
- Non → passer à la question B.

**Question B — Idée de calculateur ?**
Le fil révèle-t-il un besoin de calcul récurrent qui n'est pas encore couvert ?
- Oui → noter le concept en une phrase, évaluer la fréquence estimée du besoin.
- Non → ignorer le fil.

Ne pas noter les fils qui expriment un besoin de conseil personnalisé (hors scope
du projet) ou dont la réponse est purement narrative (pas de calcul en jeu).

### 4. Produire le rapport

Présenter le rapport dans la conversation dans ce format exact :

---

## Forum Watch — MoneyVox — [date du jour]

### Opportunités réponse
*Fils où un calculateur existant peut aider.*

| # | Fil | Catégorie | Calculateur | Comment |
|---|-----|-----------|-------------|---------|
| 1 | [Titre](url) | épargne-retraite | `/per-individuel` | Calcule l'économie d'impôt sur versement, répond directement à la question. |
| … | … | … | … | … |

*(Maximum 10 entrées. Trier par pertinence décroissante.)*

---

### Idées backlog
*Fils suggérant un calculateur non encore couvert.*

| # | Fil | Catégorie | Concept | Note |
|---|-----|-----------|---------|------|
| 1 | [Titre](url) | transmission-patrimoine | Simulateur donation avec rappel fiscal 15 ans | Demande récurrente ; pas encore en backlog. |
| … | … | … | … | … |

*(Maximum 10 entrées. Trier par pertinence estimée.)*

---

### Synthèse
- **Catégories scannées** : 5
- **Fils analysés** : N
- **Opportunités réponse trouvées** : N
- **Idées backlog nouvelles** : N (hors doublons déjà proposés)

---

### 5. STOP — attendre instruction

Présenter le rapport. **Ne modifier ni BACKLOG.md ni aucun autre fichier.**

Si Nicolas dit "go backlog [numéros]", ajouter les idées correspondantes dans
`BACKLOG.md` section P3 au format `proposed`, puis committer.

---

## Règles de qualité

- **Pas de faux positifs** : ne pas classer en "Réponse" un fil dont la question
  dépasse les capacités du calculateur.
- **Pas de doublons backlog** : comparer avec les entrées `proposed` existantes
  avant de créer une nouvelle idée.
- **Volume raisonnable** : si plus de 10 fils méritent chaque section, ne retenir
  que les 10 plus pertinents.
- **Liens vérifiés** : utiliser l'URL complète du fil MoneyVox.

---

## Catégories MoneyVox → Calculateurs CalcPatrimoine (correspondance)

| Catégorie MoneyVox | Calculateurs existants | Calculateurs backlog |
|-------------------|----------------------|---------------------|
| assurance-vie | `/assurance-vie/fiscalite-rachat`, `/assurance-vie/transmission` | — |
| epargne-retraite | `/per-individuel` | — |
| transmission-patrimoine | — | `donation` (P2 todo), `succession` (P2 todo) |
| immobilier-locatif | `/plus-value-immobiliere` | `lmnp-reel-vs-micro` (P3), `sci-is-vs-ir` (P3) |
| bourse | — | `pea` (P3) |
