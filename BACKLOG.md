# BACKLOG - Calculateurs calcpatrimoine

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
| `donation/droits` | Donation (art. 777/779/784/790 G CGI, rappel 15 ans) | `done` | 2026-05-30 |

---

## Prochains calculateurs - priorisé

### P1 - À faire en priorité

#### `tmi` - Tranche marginale d'imposition
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
  - Barème IR 2026 (revenus 2025) - LF 2026
  - Art. 197 CGI (barème) et 197-I-4 (décote)
  - Art. 194-196 CGI (quotient familial)
- **Complexité** : moyenne. Pièges : plafonnement quotient familial, demi-parts
  supplémentaires, décote conjugale.
- **Features différenciantes** : projection année N+1, impact d'un versement
  PER / d'un don / de travaux éligibles CITE/MaPrimeRénov'.

#### `per/fiscalite-versement` - PER : économie d'impôt sur versement
- **Statut** : `done`
- **Date** : 2026-05-01
- **Slug déployé** : `/per-individuel` (affiné lors du cadrage grill-me)
- **Assignee** : claude-code-session-2026-05-01
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

#### `plus-value-immobiliere` - Plus-value immobilière (résidence secondaire / investissement)
- **Statut** : `done`
- **Date** : 2026-05-06
- **Assignee** : claude-code-session-2026-05-06
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

### P2 - À faire ensuite

#### `ifi` - Impôt sur la fortune immobilière
- **Statut** : `done`
- **Date** : 2026-05-07
- **Assignee** : claude-code-session-2026-05-07
- **Volume recherche estimé** : ~3 000/mois
- **Description** : Calcul de l'IFI à partir du patrimoine immobilier net.
- **Entrées** : valeur biens immo, dettes déductibles, décote résidence
  principale (30%), situation familiale.
- **Sorties** : patrimoine net taxable, barème progressif, IFI brut,
  plafonnement, IFI net.
- **Sources** : Art. 964 à 983 CGI, BOFiP BOI-PAT-IFI.
- **Complexité** : moyenne. Attention au plafonnement IFI + IR.

#### `donation` - Donation (droits de donation par lien de parenté)
- **Statut** : `done`
- **Date** : 2026-05-30
- **Slug déployé** : `/donation/droits` (FAQ : `/faq/donation-droits`)
- **Assignee** : claude-code-session-2026-05-30
- **Description** : Calcul des droits de donation selon le lien de parenté,
  abattements par donateur/donataire, rappel fiscal 15 ans, don familial 790 G.
- **Sources** : Art. 777, 779, 784, 790 E, 790 G CGI.
- **Complexité** : élevée (tables par lien, règle du rappel, cumul avec
  donations antérieures, conditions d'âge 790 G).

#### `succession` - Succession (droits de succession)
- **Statut** : `todo`
- **Description** : Calcul des droits de succession par héritier (abattements,
  barème, réduction par lien).
- **Sources** : Art. 777 et s. CGI, Art. 796-0 bis (exonération conjoint),
  Art. 990 I / 757 B (assurance-vie en succession).
- **Complexité** : élevée. Interaction complexe avec assurance-vie.

### P3 - Bonus / plus tard

#### `pea` - Fiscalité PEA (durée détention + passif fiscal latent)
- **Statut** : `proposed`
- **Description** : Deux besoins distincts, candidats à un même outil.

  **1. Fiscalité de sortie** : exonération IR après 5 ans, PS (17,2 %) toujours
  dus sur les plus-values. Calcul net perçu selon la date d'entrée et le capital.

  **2. Suivi patrimonial brut / net (origine Reddit - r/vosfinances 2026-05)** :
  un PEA ancien à 500 k€ ne vaut pas 500 k€ net car la CSG latente (~18,3 % sur
  la plus-value) n'est pas encore réalisée. Trois approches coexistent :
  - *Brut* : 500 k€ - représente l'exposition réelle aux marchés.
  - *Net de sortie* : versements + (PV × 81,7 %) - ce qu'on toucherait aujourd'hui.
  - *Bilan* : 500 k€ à l'actif, passif fiscal latent (~64 k€ dans l'exemple) mis
    à jour dynamiquement. Analogue aux impôts différés (IAS 12 / deferred tax).
  L'outil pourrait proposer les trois chiffres + le crédit lombard comme alternative
  (accès liquidités sans déclencher la CSG).

  **Complexité CSG historique** : pour les vieux PEA (années 90), les taux PS
  ont varié dans le temps - il faut recalculer par période. Vérifier le degré
  de précision attendu avant de spécifier.

#### `sci-is-vs-ir` - SCI à l'IS vs à l'IR (comparateur simplifié)
- **Statut** : `proposed`
- **Description** : Comparaison fiscale simplifiée sur un projet locatif
  donné. **Attention** : très casse-gueule, ne pas sortir tant que la
  méthodologie n'est pas béton.

#### `lmnp-reel-vs-micro` - LMNP réel vs micro-BIC
- **Statut** : `proposed`
- **Description** : Comparaison entre régimes LMNP. Délicat sur le timing de
  la réforme 2025-2026 (meublé touristique).

#### `csg-csds-retraite` - CSG/CRDS sur pensions de retraite
- **Statut** : `proposed`
- **Description** : Calcul du taux CSG applicable (exonéré / réduit / médian /
  normal) selon le RFR.

#### `per-sortie` - PER : fiscalité de liquidation (capital vs rente)
- **Statut** : `proposed`
- **Origine** : Forum MoneyVox r/épargne-retraite - 2026-05-08
- **Description** : Complément de `/per-individuel` (côté sortie). Comparaison
  fiscale entre sortie en capital et sortie en rente, selon la TMI à la retraite
  et la durée de détention. Calcul de l'impôt sur le capital récupéré (versements
  déduits imposables à l'IR + PV soumises à flat tax ou IR selon option).
- **Besoin** : aussi fréquent que la question de l'entrée - plusieurs fils/mois
  sur MoneyVox et r/vosfinances.

#### `comparateur-locatif-placement` - Comparateur immobilier locatif vs placement financier
- **Statut** : `proposed`
- **Origine** : Forum MoneyVox r/immobilier-locatif - 2026-05-08
- **Description** : Pour un même capital et une même durée, comparer le rendement
  net after-tax d'un investissement locatif (loyers nets, plus-value de cession,
  fiscalité LMNP/nu) vs un placement financier (AV fonds euros + UC, PEA).
  Hypothèses paramétrables : rendement locatif, valorisation annuelle, TMI,
  régime fiscal.
- **Complexité** : élevée - ne pas sortir avant que la méthodologie soit validée.
  Risque de comparer des pommes et des oranges si les hypothèses ne sont pas
  explicites.

#### `donation-demembrement` - Donation avec démembrement (nue-propriété / usufruit)
- **Statut** : `proposed`
- **Origine** : Forum MoneyVox r/transmission-patrimoine - 2026-05-08
- **Description** : Extension naturelle du calculateur `donation` (P2 todo).
  Calcul des droits de donation sur la valeur de la nue-propriété selon l'âge
  du donateur (barème Art. 669 CGI). Visualisation de l'économie de droits par
  rapport à une donation en pleine propriété, et impact sur la plus-value future
  lors de la revente par le donataire.
- **Prérequis** : implémenter `donation` (pleine propriété) en premier.

---

## Règles de mise à jour

- **En début de calculateur** : `todo` → `in-progress`, ajouter `assignee: claude-code-session-<date>`.
- **En fin de calculateur** : `in-progress` → `done`, ajouter la date.
- **Si blocage** : `in-progress` → `blocked`, avec raison en commentaire.
- **Si nouvelle idée pendant une session** : ajouter en `proposed` en bas avec
  une description minimale. Ne jamais faire un calculateur `proposed` sans
  validation humaine - seuls les `todo` sont autorisés à l'implémentation.

Last updated: 2026-05-30 (calculateur donation/droits livré).
