# Issue Tracker

Issues pour ce repo dans **GitHub Issues** sur `github.com/nba67000/calculpatrimoine`.

## CLI

Toutes les opérations utilisent le CLI `gh` (GitHub CLI). Supposer qu'il est authentifié.

## Commandes clés

| Opération | Commande |
|-----------|----------|
| Lister les issues ouvertes | `gh issue list` |
| Voir une issue | `gh issue view <numéro>` |
| Créer une issue | `gh issue create --title "..." --body "..."` |
| Ajouter un label | `gh issue edit <numéro> --add-label "..."` |
| Retirer un label | `gh issue edit <numéro> --remove-label "..."` |
| Fermer une issue | `gh issue close <numéro>` |
| Commenter | `gh issue comment <numéro> --body "..."` |
| Lister avec label | `gh issue list --label "needs-triage"` |

## Conventions

- Le numéro GitHub est la référence canonique (`#42`, pas un slug).
- Les labels sont les métadonnées primaires — voir `docs/agents/triage-labels.md`.
- Les milestones ne sont pas utilisés dans les workflows agents.
- Les issues créées par un agent doivent inclure le label `ready-for-agent` ou `needs-triage` selon leur état initial.
