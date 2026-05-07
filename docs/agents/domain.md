# Domain Docs

## Layout

**Single-context.** Un seul `CONTEXT.md` à la racine du repo + `docs/adr/` pour les décisions d'architecture.

## Chemins

| Ressource | Chemin |
|-----------|--------|
| Vocabulaire domaine | `CONTEXT.md` |
| Décisions d'architecture | `docs/adr/` |

## Règles de lecture pour les skills

- Lire `CONTEXT.md` avant toute tâche liée à l'architecture, au domaine métier ou au design.
- Utiliser le vocabulaire de `CONTEXT.md` tel quel — ne pas inventer de synonymes ni dériver vers des termes génériques.
- Avant de proposer un refactor ou un changement architectural, vérifier `docs/adr/` pour les décisions qui couvrent déjà la zone.
- Si une proposition contredit un ADR existant, le signaler explicitement et expliquer pourquoi ça vaut la peine de le rouvrir.
- Si `CONTEXT.md` n'existe pas encore, noter le manque mais ne pas bloquer — le skill le créera progressivement.
- Si `docs/adr/` n'existe pas, créer le répertoire lors du premier ADR écrit.

## Format ADR

Fichiers nommés `docs/adr/NNN-titre-kebab-case.md`. Structure minimale :

```markdown
# ADR-NNN — Titre

**Statut** : Accepté / Rejeté / Remplacé par ADR-XXX
**Date** : YYYY-MM-DD

## Contexte
[Pourquoi cette décision était nécessaire]

## Décision
[Ce qui a été décidé]

## Raison
[Pourquoi cette option plutôt qu'une autre]

## Conséquences
[Ce que ça implique en pratique]
```
