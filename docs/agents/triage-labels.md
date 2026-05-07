# Triage Labels

Labels utilisés par le skill `triage` pour ce repo.

## Mapping

| Rôle | Label |
|------|-------|
| Mainteneur doit évaluer | `needs-triage` |
| En attente d'info du reporter | `needs-info` |
| Spécifiée, prête pour un agent autonome | `ready-for-agent` |
| À implémenter par un humain | `ready-for-human` |
| Ne sera pas traité | `wontfix` |

## Créer les labels (première fois)

Si les labels n'existent pas encore dans le repo :

```bash
gh label create "needs-triage"    --color "#e4e669" --description "En attente d'évaluation mainteneur"
gh label create "needs-info"      --color "#d876e3" --description "En attente d'info du reporter"
gh label create "ready-for-agent" --color "#0075ca" --description "Spécifiée, agent peut prendre"
gh label create "ready-for-human" --color "#008672" --description "À implémenter par un humain"
gh label create "wontfix"         --color "#ffffff"  --description "Ne sera pas traité"
```

## Machine à états

```
[entrée] → needs-triage → needs-info ⟲
                       ↓
               ready-for-agent → [agent prend]
               ready-for-human → [humain prend]
                       ↓
                    wontfix
```
