---
description: Scanne r/vosfinances pour détecter (1) les posts où un calculateur existant peut répondre, (2) les idées de nouveaux calculateurs à proposer en backlog. Rapport uniquement — aucune modification sans validation.
---

# /reddit-watch

Tu es un veilleur produit pour CalcPatrimoine. Ta mission : lire les posts récents de
r/vosfinances et produire un rapport en deux sections.

---

## Étapes

### 1. Lire l'état du projet

Avant de toucher Reddit, lire :
- `BACKLOG.md` — calculateurs livrés et idées déjà notées (`proposed`)
- `src/config/navigation.ts` — slugs et noms des calculateurs déployés

Mémoriser :
- Les slugs et descriptions des calculateurs **existants** (pour la section Réponses).
- Les idées déjà en `proposed` (pour éviter les doublons dans la section Idées).

### 2. Fetcher les posts Reddit

Appeler successivement ces deux URLs via **WebFetch** :

```
https://www.reddit.com/r/vosfinances/hot.json?limit=50
https://www.reddit.com/r/vosfinances/top.json?t=week&limit=50
```

Dédupliquer par `id`. Pour chaque post retenu, extraire :
- `title` — titre
- `selftext` — corps du post (tronquer à 800 caractères pour l'analyse)
- `score` — upvotes
- `num_comments`
- `link_flair_text` — flair
- `permalink` — URL relative (construire `https://reddit.com<permalink>`)

**Filtrer les posts non pertinents** avant l'analyse :
- Ignorer les posts sans selftext (liens externes purs, images).
- Ignorer les flairs manifestement hors sujet : `Humour`, `Méta`, `Offre d'emploi`.
- Ne retenir que les posts avec score ≥ 5 **ou** num_comments ≥ 3.

### 3. Analyser chaque post

Pour chaque post retenu, répondre à deux questions :

**Question A — Réponse existante ?**
Un calculateur déployé sur CalcPatrimoine peut-il aider directement ?
- Oui → noter le slug, expliquer en une phrase comment il répond.
- Partiellement → noter le slug + ce qui manque.
- Non → passer à la question B.

**Question B — Idée de calculateur ?**
Le post révèle-t-il un besoin de calcul récurrent qui n'est pas encore couvert ?
- Oui → noter le concept en une phrase, évaluer la fréquence estimée du besoin.
- Non → ignorer le post.

Ne pas noter les posts qui expriment un besoin de conseil personnalisé (hors scope
du projet) ou dont la réponse est purement narrative (pas de calcul en jeu).

### 4. Produire le rapport

Présenter le rapport dans la conversation dans ce format exact :

---

## Reddit Watch — r/vosfinances — [date du jour]

### Opportunités réponse
*Posts où un calculateur existant peut aider.*

| # | Post | Score | Calculateur | Comment |
|---|------|-------|-------------|---------|
| 1 | [Titre](url) | 42 | `/per-individuel` | Calcule l'économie d'impôt sur versement, répond directement à la question. |
| … | … | … | … | … |

*(Maximum 10 entrées. Trier par score décroissant.)*

---

### Idées backlog
*Posts suggérant un calculateur non encore couvert.*

| # | Post | Score | Concept | Note |
|---|------|-------|---------|------|
| 1 | [Titre](url) | 18 | Simulateur donation avec rappel fiscal 15 ans | Demande fréquente sur les donations enfants/petits-enfants ; pas encore en backlog. |
| … | … | … | … | … |

*(Maximum 10 entrées. Trier par pertinence estimée.)*

---

### Synthèse
- **Posts analysés** : N
- **Opportunités réponse trouvées** : N
- **Idées backlog nouvelles** : N (hors doublons déjà proposés)

---

### 5. STOP — attendre instruction

Présenter le rapport. **Ne modifier ni BACKLOG.md ni aucun autre fichier.**

Si Nicolas dit "go backlog [numéros]", ajouter les idées correspondantes dans
`BACKLOG.md` section P3 au format `proposed`, puis committer.

---

## Règles de qualité

- **Pas de faux positifs** : ne pas classer en "Réponse" un post dont la question
  dépasse les capacités du calculateur (ex : post sur PEA si le calculateur PEA
  n'est pas encore déployé).
- **Pas de doublons backlog** : comparer avec les entrées `proposed` existantes
  avant de créer une nouvelle idée.
- **Volume raisonnable** : si plus de 10 posts méritent chaque section, ne retenir
  que les 10 plus pertinents (score × pertinence thématique).
- **Liens vérifiés** : construire l'URL Reddit complète à partir du `permalink`
  de l'API (`https://reddit.com` + permalink).
