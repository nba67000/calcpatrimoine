# BACKLOG — Calculateurs calcpatrimoine

Liste priorisée des calculateurs à implémenter. Claude Code lit ce fichier au
début de chaque session et **met à jour les statuts** au fil de l'eau.

**Statuts** : `todo` · `in-progress` · `done` · `blocked` · `proposed`
**Priorité** : `P0` (urgent) · `P1` (haut) · `P2` (moyen) · `P3` (bas)

---

## Déjà livrés

| Slug | Nom | Statut | Date |
|------|-----|--------|------|
| `rente-viagere` | Rente viagère (classique / inverse / couple) | `done` | 2026-04 |
| `assurance-vie/fiscalite-rachat` | Fiscalité rachat assurance-vie | `done` | 2026-04 |
| `assurance-vie/transmission` | Transmission assurance-vie (art. 990 I / 757 B) | `done` | 2026-04 |
| `tmi` | Tranche marginale d'imposition (barème IR 2026, QF, décote) | `done` | 2026-04-19 |

---

## Prochains calculateurs — priorisé

### P1 — À faire en priorité

#### `tmi` — Tranche marginale d'imposition
- **Statut** : `done`
- **Date** : 2026-04-19
- **Volume recherche estimé** : ~12 000/mois
- **Description** : Calcul TMI et taux moyen à partir du revenu imposable et
  de la situation familiale (célibataire / marié-pacsé / parts fiscales).
  Affichage du barème progressif et de la décote éventuelle.
- **Entrées** : revenu net imposable, situation familiale, nombre d'enfants
  à charge, rattachement éventuel.
- **Sorties** : TMI (%), IR brut, décote, IR net, taux moyen, ventilation
  par tranche.
- **Sources à vérifier** :
  - Barème IR 2026 (revenus 2025) — LF 2026
  - Art. 197 CGI (barème) et 197-I-4 (décote)
  - Art. 194-196 CGI (quotient familial)
- **Complexité** : moyenne. Pièges : plafonnement quotient familial, demi-parts
  supplémentaires, décote conjugale.
- **Features différenciantes** : projection année N+1, impact d'un versement
  PER / d'un don / de travaux éligibles CITE/MaPrimeRénov'.

#### `per/fiscalite-versement` — PER : économie d'impôt sur versement
- **Statut** : `todo`
- **Volume recherche estimé** : ~6 500/mois
- **Description** : Calcul de l'économie d'impôt réalisée par un versement
  volontaire sur un PER individuel, selon la TMI et le plafond annuel.
- **Entrées** : revenus professionnels N-1, TMI actuelle, versements PER
  précédents non utilisés (report 3 ans), statut (salarié / TNS).
- **Sorties** : plafond disponible, économie d'impôt, rendement fiscal (%),
  comparaison "versement 1000€ vs 5000€", impact sur TMI.
- **Sources à vérifier** :
  - Art. 163 quatervicies CGI (plafond et déductibilité)
  - Art. L.224-1 et suivants C. monétaire et financier
  - BOFiP BOI-IR-BASE-20-50-10
- **Complexité** : moyenne. Attention au plafond TNS (Madelin) qui a des règles
  différentes.

#### `plus-value-immobiliere` — Plus-value immobilière (résidence secondaire / investissement)
- **Statut** : `todo`
- **Volume recherche estimé** : ~5 000/mois
- **Description** : Calcul de la plus-value imposable avec abattements pour
  durée de détention (IR et prélèvements sociaux ont des cadences différentes).
- **Entrées** : prix d'achat, date d'achat, frais d'acquisition (ou forfait 7,5%),
  travaux (ou forfait 15% si détention > 5 ans), prix de vente, date de vente.
- **Sorties** : plus-value brute, abattements IR et PS séparés, IR (19%), PS
  (17,2%), surtaxe éventuelle, total dû, net perçu.
- **Sources à vérifier** :
  - Art. 150 U, 150 VA à 150 VH CGI
  - Art. 1609 nonies G CGI (surtaxe > 50 000€)
  - BOFiP BOI-RFPI-PVI
- **Complexité** : élevée. Pièges : exonération résidence principale, abattement
  différent après 5 / 22 / 30 ans (IR) vs 5 / 22 / 30 ans (PS), surtaxe paliers,
  cas particuliers (1re cession autre que résidence principale, < 15 000€, etc.).

### P2 — À faire ensuite

#### `ifi` — Impôt sur la fortune immobilière
- **Statut** : `todo`
- **Volume recherche estimé** : ~3 000/mois
- **Description** : Calcul de l'IFI à partir du patrimoine immobilier net.
- **Entrées** : valeur biens immo, dettes déductibles, décote résidence
  principale (30%), situation familiale.
- **Sorties** : patrimoine net taxable, barème progressif, IFI brut,
  plafonnement, IFI net.
- **Sources** : Art. 964 à 983 CGI, BOFiP BOI-PAT-IFI.
- **Complexité** : moyenne. Attention au plafonnement IFI + IR.

#### `donation` — Donation (droits de donation par lien de parenté)
- **Statut** : `todo`
- **Description** : Calcul des droits de donation selon le lien de parenté,
  abattements par donateur/donataire, rappel fiscal 15 ans.
- **Sources** : Art. 777, 779, 784 CGI.
- **Complexité** : élevée (tables par lien, règle du rappel, cumul avec
  donations antérieures).

#### `succession` — Succession (droits de succession)
- **Statut** : `todo`
- **Description** : Calcul des droits de succession par héritier (abattements,
  barème, réduction par lien).
- **Sources** : Art. 777 et s. CGI, Art. 796-0 bis (exonération conjoint),
  Art. 990 I / 757 B (assurance-vie en succession).
- **Complexité** : élevée. Interaction complexe avec assurance-vie.

### P3 — Bonus / plus tard

#### `pea` — Fiscalité PEA (durée détention + plafonds)
- **Statut** : `proposed`
- **Description** : Impact de la durée de détention du PEA sur la fiscalité
  du retrait (exonération IR après 5 ans, PS toujours dus).

#### `sci-is-vs-ir` — SCI à l'IS vs à l'IR (comparateur simplifié)
- **Statut** : `proposed`
- **Description** : Comparaison fiscale simplifiée sur un projet locatif
  donné. **Attention** : très casse-gueule, ne pas sortir tant que la
  méthodologie n'est pas béton.

#### `lmnp-reel-vs-micro` — LMNP réel vs micro-BIC
- **Statut** : `proposed`
- **Description** : Comparaison entre régimes LMNP. Délicat sur le timing de
  la réforme 2025-2026 (meublé touristique).

#### `csg-csds-retraite` — CSG/CRDS sur pensions de retraite
- **Statut** : `proposed`
- **Description** : Calcul du taux CSG applicable (exonéré / réduit / médian /
  normal) selon le RFR.

---

## Règles de mise à jour

- **En début de calculateur** : `todo` → `in-progress`, ajouter `assignee: claude-code-session-<date>`.
- **En fin de calculateur** : `in-progress` → `done`, ajouter la date.
- **Si blocage** : `in-progress` → `blocked`, avec raison en commentaire.
- **Si nouvelle idée pendant une session** : ajouter en `proposed` en bas avec
  une description minimale. Ne jamais faire un calculateur `proposed` sans
  validation humaine — seuls les `todo` sont autorisés à l'implémentation.

Last updated: 2026-04-19.
