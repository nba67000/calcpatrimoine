# Sources — <Nom du calculateur>

**Dernière vérification** : YYYY-MM-DD
**Millésime fiscal** : Revenus YYYY / Barème YYYY+1
**Calculateur concerné** : `src/app/<slug>/page.tsx`

---

## Textes de loi

### Code général des impôts

- **Article XXX CGI** — <objet, 1 phrase>
  - URL : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI...
  - Version en vigueur : <date>
  - Point clé repris dans le calcul : <reformulation, 15 mots max>

### Autres codes applicables

- **Article L.XXX du Code <...>** — <objet>
  - URL : https://...

---

## Doctrine administrative

### BOFiP

- **BOI-<référence>** — <titre>
  - URL : https://bofip.impots.gouv.fr/bofip/<id>-PGP.html
  - Date publication : YYYY-MM-DD
  - Sections utilisées : §<numéros>

### BOSS (si applicable)

- **BOSS <référence>** — <titre>
  - URL : https://boss.gouv.fr/portail/accueil/...

---

## Barèmes et taux appliqués

| Paramètre | Valeur | Source | Article | Millésime |
|-----------|--------|--------|---------|-----------|
| <ex: Tranche IR 14%> | 14 % | CGI | Art. 197-I-1 | 2026 |
| <ex: Plafond quotient familial> | 1 793 € | CGI | Art. 197-I-2 | 2026 |

---

## Exemples de référence

Cas chiffrés vérifiés pour validation des calculs :

### Exemple 1 — <nom du cas>
Source : <BOFiP / service-public / communiqué>

**Inputs** :
- <paramètre> : <valeur>
- <paramètre> : <valeur>

**Résultat attendu** :
- <grandeur> : <valeur> €
- <grandeur> : <valeur> €

**Écart toléré** : ± 1 € (arrondis)

### Exemple 2 — <nom du cas>
<...>

---

## Cas traités / non traités

### Ce que le calculateur **traite**

- <cas standard>
- <cas particulier pris en charge>

### Ce que le calculateur **ne traite pas** (volontairement)

- <cas hors scope, avec raison>
- <cas nécessitant un conseil personnalisé>
- <cas trop marginal pour la v1>

Ces limites **doivent** être mentionnées dans la section "À savoir" de la
page du calculateur.

---

## Notes de vérification

### Historique des mises à jour

| Date | Vérifié par | Changements | Commit |
|------|-------------|-------------|--------|
| YYYY-MM-DD | Claude Code | Création initiale | <hash> |

### Points de vigilance

- <alerte sur un point complexe>
- <date prévue de mise à jour légale>
