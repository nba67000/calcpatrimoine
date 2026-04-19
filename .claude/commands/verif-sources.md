---
description: Vérifie que les sources légales de tous les calculateurs sont à jour et toujours valides.
---

# /verif-sources

Audit périodique des sources légales du projet. À lancer tous les 3 mois, ou
après l'adoption d'une loi de finances / d'une LFSS.

## Étapes

### 1. Lister les calculateurs livrés

Lire `BACKLOG.md`, section "Déjà livrés". Pour chaque calculateur, localiser
son fichier `docs/sources/<slug>.md`.

### 2. Pour chaque fichier sources

- Relire la "dernière vérification" et le millésime fiscal.
- Pour chaque URL Légifrance / BOFiP citée, **WebFetch** et vérifier :
  - L'article est-il toujours en vigueur ?
  - Le texte a-t-il été modifié depuis la dernière vérification ?
  - Les chiffres (taux, seuils, abattements) dans le code correspondent-ils
    encore au texte en vigueur ?
- Pour chaque barème présent dans `lib/constants.ts` ou inline, vérifier
  qu'il correspond au millésime déclaré.

### 3. Synthèse

Produire un rapport `docs/audits/audit-YYYY-MM-DD.md` avec :

- Calculateurs dont les sources sont **à jour** (OK).
- Calculateurs nécessitant une **mise à jour mineure** (date de consultation,
  reformulation) — lister les fichiers.
- Calculateurs nécessitant une **mise à jour majeure** (changement de taux,
  nouveau barème, évolution légale) — lister avec la nature du changement.
- Calculateurs avec **risque de divergence** (l'article cité a changé mais
  l'impact sur le calcul n'est pas évident à juger).

### 4. Actions

- **Mise à jour mineure** : Claude peut la faire directement et commiter :
  `docs(sources): maj vérification <slug> <date>`.
- **Mise à jour majeure** : Claude **propose** la correction (patch du code +
  mise à jour de `docs/sources/<slug>.md`) mais **attend validation** avant
  de commiter.
- **Risque de divergence** : Claude résume, liste les questions, et attend
  les réponses de Nicolas.

## Règle d'or

Ne **jamais** modifier un barème ou un taux dans le code sans :
1. Avoir l'URL Légifrance à jour sourçant le nouveau chiffre.
2. Mettre à jour `docs/sources/<slug>.md` en conséquence.
3. Ajouter un commentaire dans le code pointant vers la version en vigueur.
