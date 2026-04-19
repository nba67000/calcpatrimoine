---
description: Enchaîne plusieurs calculateurs en autonomie en respectant les règles de sécurité et de pause.
---

# /mode-autonome

Tu vas enchaîner l'implémentation de **plusieurs calculateurs** depuis la
`BACKLOG.md` en suivant le workflow de `/nouveau-calculateur` pour chacun.

Ce mode n'est **pas** une autorisation à foncer. C'est un enchaînement
discipliné avec points de contrôle.

## Règles

### Avant de démarrer

- Confirmer à l'utilisateur : combien de calculateurs `todo` sont présents,
  lesquels seront traités dans quel ordre, et la règle de pause (voir plus bas).
- Vérifier que `git status` est clean. Si des fichiers non commités traînent,
  **demander** avant de continuer.

### Pour chaque calculateur

- Suivre exactement le workflow de `/nouveau-calculateur` (étapes 1 à 11).
- **Commit à la fin de chaque calculateur.**
- Avant de passer au suivant :
  1. Relire `BACKLOG.md` (elle peut avoir été modifiée).
  2. Faire un `git status` pour confirmer la propreté.
  3. Afficher un court bilan : "Calculateur X done. Prochain : Y. On continue ?"
     — mais **ne pas attendre de réponse** si le flag "autonome" a été
     explicitement activé en début de session.

### Règles de pause (obligatoires)

S'arrêter **systématiquement** dans les cas suivants :

1. **Après 3 calculateurs consécutifs produits** → demander validation humaine
   pour continuer. Objectif : éviter les dérives non détectées.
2. **Doute sur un chiffre fiscal** ou **source introuvable** → s'arrêter net.
3. **Build cassé après 2 tentatives de correction** → s'arrêter, résumer.
4. **Backlog vide de `todo`** → s'arrêter, l'annoncer.
5. **Tentative de commencer un calculateur en statut `proposed`** → refuser,
   demander à Nicolas de le passer en `todo` d'abord.
6. **Modification de plus de 30 fichiers dans la session** → s'arrêter,
   demander. C'est un signe qu'on a dérivé au-delà du scope normal d'un
   calculateur.

### Ce que le mode autonome n'autorise pas

- Poussée `git push` automatique. **Jamais.**
- Changement de dépendances (`npm install <lib>`) sans justification
  documentée et validation.
- Refactor de code existant en dehors du strict nécessaire pour le calculateur
  en cours.
- Ajout de calculateurs non présents dans la backlog.
- Désactivation des règles de `CLAUDE.md`.

## Format d'annonce en fin de session

Toujours terminer par un résumé de cette forme :

```
Session mode-autonome terminée.

Calculateurs livrés :
- <slug-1> (commit <hash>)
- <slug-2> (commit <hash>)

Calculateurs bloqués / ignorés :
- <slug-X> : <raison>

État de la backlog :
- todo restants : <liste>
- blocked : <liste si non vide>

Prochaines actions suggérées à Nicolas :
- <ex: relire le commit abc123 pour valider le traitement du plafonnement>
- <ex: pousser la branche et déployer en preview>
```
