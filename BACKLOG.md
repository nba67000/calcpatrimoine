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
| `per-individuel` | PER individuel : économie d'impôt sur versement | `done` | 2026-05-01 |
| `plus-value-immobiliere` | Plus-value immobilière (résidence secondaire / investissement) | `done` | 2026-05-06 |
| `ifi` | Impôt sur la fortune immobilière | `done` | 2026-05-07 |
| `donation/droits` | Donation (art. 777/779/784/790 G CGI, rappel 15 ans) | `done` | 2026-05-30 |

---

## Prochains calculateurs - priorisé

**Ordre mis à jour le 2026-05-31** suite au scan `/forum-watch` MoneyVox.
Cf. journal en bas. Les items `done` sont consolidés dans la table ci-dessus ;
seuls les items actionnables figurent ici.

### P1 - Priorité immédiate

#### `succession` - Succession (droits de succession)
- **Statut** : `todo`
- **Promotion** : était P2, promu P1 (signal forum fort - 5 fils sur 30 jours
  dans la catégorie transmission-patrimoine de MoneyVox).
- **Description** : Calcul des droits de succession par héritier (abattements,
  barème, réduction par lien).
- **Sources** : Art. 777 et s. CGI, Art. 796-0 bis (exonération conjoint),
  Art. 990 I / 757 B (interaction avec assurance-vie).
- **Complexité** : élevée. Interaction avec assurance-vie déjà modélisée dans
  `/assurance-vie/transmission`.
- **Synergie** : complète naturellement le `/donation/droits` livré le 2026-05-30
  - même barème Art. 777, mêmes abattements Art. 779 réutilisables.

#### `per-sortie` - PER : fiscalité de liquidation (capital vs rente)
- **Statut** : `proposed`
- **Promotion** : était P3, promu P1 (signal forum fort - 3 fils confirmant
  la demande sur 30 jours : effet d'aubaine, PER après 70 ans, rachat avec
  moins de perte).
- **Origine** : Forum MoneyVox r/épargne-retraite - 2026-05-08, confirmation
  2026-05-31.
- **Description** : Complément de `/per-individuel` (côté sortie). Comparaison
  fiscale entre sortie en capital et sortie en rente, selon la TMI à la retraite
  et la durée de détention. Calcul de l'impôt sur le capital récupéré (versements
  déduits imposables à l'IR + PV soumises à flat tax ou IR selon option).

### P2 - À faire ensuite

#### `pret-intrafamilial-in-fine` - Prêt intrafamilial (transmission)
- **Statut** : `proposed` (NOUVEAU - 2026-05-31)
- **Origine** : Forum MoneyVox r/transmission-patrimoine 2026-05-31, fil 54249
  (44 réponses, encore actif).
- **Description** : Simulateur de prêt entre proches avec remboursement in fine
  comme alternative ou complément à la donation. Calcul du coût fiscal (intérêts
  imposables côté prêteur si > 1 000 € de cumul familial), traitement à la
  succession du prêteur si le capital n'est pas remboursé (intégration à
  l'actif successoral via créance détenue contre l'emprunteur), et risque de
  requalification en don indirect en cas de remise de dette.
- **Sources à vérifier** : Art. 1892 et s. C. civil (prêt), Art. 757 B CGI
  (remise de dette = don), instructions sur les prêts familiaux. Taux minimal
  d'intérêt à actualiser annuellement (référence taux moyen pratiqué).
- **Complexité** : élevée. Pièges : taux d'intérêt minimal (sinon
  requalification possible), preuves de remboursement, partage entre héritiers
  à la succession du prêteur, interaction avec abattement donation 779.

#### `donation-demembrement` - Donation avec démembrement (nue-propriété / usufruit)
- **Statut** : `proposed`
- **Promotion** : était P3, promu P2 (extension naturelle de `/donation/droits`
  livré le 2026-05-30, prérequis levé).
- **Origine** : Forum MoneyVox r/transmission-patrimoine - 2026-05-08
- **Description** : Extension du calculateur `donation/droits`. Calcul des
  droits de donation sur la valeur de la nue-propriété selon l'âge du donateur
  (barème Art. 669 CGI). Visualisation de l'économie de droits par rapport à
  une donation en pleine propriété, et impact sur la plus-value future lors de
  la revente par le donataire.
- **Synergie** : réutilise les barèmes Art. 777 et abattements Art. 779 du
  calculateur `/donation/droits`.

#### `plus-value-immobiliere-lmnp` - Mode LMNP du calculateur PV immo (EXTENSION)
- **Statut** : `proposed` (NOUVEAU - 2026-05-31)
- **Origine** : Forum MoneyVox r/immobilier-locatif fil 53221 (relancé en
  2026-05) + limite déjà signalée dans la FAQ du calculateur existant
  `/plus-value-immobiliere`.
- **Description** : Extension (pas un nouveau calculateur) du calculateur
  `/plus-value-immobiliere` pour gérer le cas LMNP. Depuis le 15/02/2025, les
  amortissements déduits dans le cadre d'une location meublée doivent être
  réintégrés au prix d'acquisition pour le calcul de la PV imposable. Le
  calculateur actuel donne un résultat trop optimiste dans ce cas (et le
  signale en FAQ).
- **Sources à vérifier** : Art. 150 VB CGI modifié par LF 2025 (à confirmer),
  BOFiP à publier sur la réintégration.
- **Complexité** : moyenne. Ajout d'un mode "LMNP" sur le calculateur existant
  + champ "amortissements cumulés déduits" + recalcul du prix d'acquisition
  fiscal. Pas de nouveau fichier de page.

### P3 - Bonus / plus tard

#### `comparateur-locatif-placement` - Comparateur immobilier locatif vs placement financier
- **Statut** : `proposed`
- **Origine** : Forum MoneyVox r/immobilier-locatif - 2026-05-08, confirmé par
  un 2e fil 54131 le 2026-05 (`/forum-watch` 2026-05-31).
- **Description** : Pour un même capital et une même durée, comparer le rendement
  net after-tax d'un investissement locatif (loyers nets, plus-value de cession,
  fiscalité LMNP/nu) vs un placement financier (AV fonds euros + UC, PEA).
  Hypothèses paramétrables : rendement locatif, valorisation annuelle, TMI,
  régime fiscal.
- **Complexité** : élevée - ne pas sortir avant que la méthodologie soit validée.
  Risque de comparer des pommes et des oranges si les hypothèses ne sont pas
  explicites.

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

#### `lmnp-reel-vs-micro` - LMNP réel vs micro-BIC
- **Statut** : `proposed`
- **Description** : Comparaison entre régimes LMNP. Délicat sur le timing de
  la réforme 2025-2026 (meublé touristique).

#### `sci-is-vs-ir` - SCI à l'IS vs à l'IR (comparateur simplifié)
- **Statut** : `proposed`
- **Description** : Comparaison fiscale simplifiée sur un projet locatif
  donné. **Attention** : très casse-gueule, ne pas sortir tant que la
  méthodologie n'est pas béton.

#### `csg-csds-retraite` - CSG/CRDS sur pensions de retraite
- **Statut** : `proposed`
- **Description** : Calcul du taux CSG applicable (exonéré / réduit / médian /
  normal) selon le RFR.

---

## Journal des scans `/forum-watch`

- **2026-05-31** : 5 catégories MoneyVox scannées, 13 fils retenus sur 30 jours.
  10 opportunités de réponse (calculateurs existants). 2 idées nouvelles
  ajoutées : `pret-intrafamilial-in-fine` (P2) et `plus-value-immobiliere-lmnp`
  (P2). Confirmation de `comparateur-locatif-placement` (2e fil). Promotion
  `succession` P2→P1 et `per-sortie` P3→P1 sur signal fort.

---

## Règles de mise à jour

- **En début de calculateur** : `todo` → `in-progress`, ajouter `assignee: claude-code-session-<date>`.
- **En fin de calculateur** : `in-progress` → `done`, ajouter la date.
- **Si blocage** : `in-progress` → `blocked`, avec raison en commentaire.
- **Si nouvelle idée pendant une session** : ajouter en `proposed` en bas avec
  une description minimale. Ne jamais faire un calculateur `proposed` sans
  validation humaine - seuls les `todo` sont autorisés à l'implémentation.

Last updated: 2026-05-31 (scan forum-watch + réorganisation par signal marché).
