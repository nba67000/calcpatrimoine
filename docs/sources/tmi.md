# Sources — Calculateur TMI (Tranche Marginale d'Imposition)

**Dernière vérification** : 2026-04-19
**Millésime fiscal** : Revenus 2025 / Barème 2026

## Textes de loi

- **Article 197 du Code général des impôts** — Barème progressif de l'impôt sur le revenu et décote
  URL Légifrance : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051212954
  Extrait pertinent : "Il est fait application d'une décote lorsque le montant de l'impôt brut est inférieur à [limite]"

- **Article 194 du Code général des impôts** — Quotient familial, nombre de parts
  URL Légifrance : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006302756
  Extrait pertinent : "Chaque enfant [à charge] ouvre droit à une demi-part supplémentaire"

- **Article 195 du Code général des impôts** — Demi-parts supplémentaires (invalidité, etc.)
  URL Légifrance : https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006179579/

- **Article 196 du Code général des impôts** — Enfants à charge
  URL Légifrance : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006302765

## Doctrine administrative

- **BOFiP BOI-IR-LIQ-20-10** — Barème de l'impôt sur le revenu 2026
  URL : https://bofip.impots.gouv.fr/bofip/2491-PGP.html/identifiant=BOI-IR-LIQ-20-10-20260407
  Date publication : 2026-04-07

- **BOFiP BOI-IR-LIQ-20-20-20** — Plafonnement des effets du quotient familial
  URL : https://bofip.impots.gouv.fr/bofip/2494-PGP.html/identifiant=BOI-IR-LIQ-20-20-20-20260407
  Date publication : 2026-04-07

- **BOFiP BOI-IR-LIQ-20-20-30** — Décote
  URL : https://bofip.impots.gouv.fr/bofip/2495-PGP.html/identifiant=BOI-IR-LIQ-20-20-30-20250414
  Date publication : 2025-04-14 (valeurs 2024 — 2026 extrapolées par indexation +0,9%)

- **Actualité BOFiP ACTU-2026-00022** — Indexation barème +0,9% LF 2026
  URL : https://bofip.impots.gouv.fr/bofip/14954-PGP.html/ACTU-2026-00022

## Barèmes et taux

| Paramètre | Valeur | Source | Millésime |
|-----------|--------|--------|-----------|
| Tranche 0% | jusqu'à 11 600 € / part | Art. 197 CGI — LF 2026 art. 4 | 2026 |
| Tranche 11% | 11 600 € – 29 579 € / part | Art. 197 CGI — LF 2026 art. 4 | 2026 |
| Tranche 30% | 29 579 € – 84 577 € / part | Art. 197 CGI — LF 2026 art. 4 | 2026 |
| Tranche 41% | 84 577 € – 181 917 € / part | Art. 197 CGI — LF 2026 art. 4 | 2026 |
| Tranche 45% | > 181 917 € / part | Art. 197 CGI — LF 2026 art. 4 | 2026 |
| Décote célibataire | 897 € − 45,25 % × IR brut (seuil 1 982 €) | Art. 197-I-4 CGI, indexé +0,9% | 2026 |
| Décote couple/pacsé | 1 483 € − 45,25 % × IR brut (seuil 3 277 €) | Art. 197-I-4 CGI, indexé +0,9% | 2026 |
| Plafond QF / demi-part | 1 807 € | Art. 197-IV CGI — LF 2026 | 2026 |
| Plafond QF 1er enfant parent isolé | 4 262 € (1 part entière = 0,5 enfant + 0,5 case T) | Art. 197-IV CGI — LF 2026 | 2026 |

## Exemples de référence

### Exemple 1 — Célibataire, 30 000 € de revenu net imposable, sans enfant
(Source : service-public.gouv.fr, calcul vérifié le 2026-04-19)
- 1 part fiscale
- Tranche 0% : 0 € (jusqu'à 11 600 €)
- Tranche 11% : (29 579 – 11 600) × 11 % = 1 977,69 €
- Tranche 30% : (30 000 – 29 579) × 30 % = 126,30 €
- IR brut = 2 104 €
- Décote : IR brut (2 104 €) > seuil 1 982 € → pas de décote
- IR net = 2 104 €
- TMI = 30 %, taux moyen ≈ 7,0 %

### Exemple 2 — Marié, 2 enfants, 60 000 € de revenu net imposable
(Source : calcul manuel vérifié sur les barèmes officiels LF 2026)
- 3 parts (2 base + 0,5 × 2 enfants)
- Revenu / 3 parts = 20 000 €
- Tranche 11% : (20 000 – 11 600) × 11 % = 924 €
- IR QF = 924 × 3 = 2 772 €
- IR base (2 parts) : revenu/2 = 30 000 € → 2 104 € × 2 = 4 208 €
- Réduction QF = 4 208 – 2 772 = 1 436 € < plafond 3 614 € → pas de plafonnement
- Décote couple : 1 483 – 45,25 % × 2 772 = 1 483 – 1 254 = 229 €
- IR net = 2 772 – 229 = 2 543 €
- TMI = 11 %, taux moyen ≈ 4,2 %

### Exemple 3 — Célibataire, 1 enfant, 50 000 € (plafonnement QF)
(Source : calcul manuel démontrant le plafonnement)
- 1,5 parts (1 base + 0,5 enfant)
- IR QF (1,5 parts) : 33 333 € / part → 3 104 € × 1,5 = 4 656 €
- IR base (1 part) : 50 000 € / part → 8 104 €
- Réduction QF = 8 104 – 4 656 = 3 448 € > plafond 1 807 € → PLAFONNEMENT
- IR après plafonnement = 8 104 – 1 807 = 6 297 €
- Décote : IR > seuil 1 982 € → pas de décote
- IR net = 6 297 €

## Notes et limites connues

- Ce calculateur ne traite pas :
  - Les revenus catégoriels séparément (il prend le revenu net imposable global)
  - L'abattement professionnel de 10 % (l'utilisateur saisit le revenu NET imposable, après abattement)
  - Les réductions d'impôt (dons, emploi à domicile, etc.)
  - Les crédits d'impôt
  - La contribution sur les hauts revenus (CEHR — Art. 223 sexies CGI)
  - Les contribuables en résidence alternée (demi-parts partagées à 0,25)
  - Les cas spéciaux de veuf(ve) la première année du veuvage
  - Les membres de l'ordre de la Légion d'honneur, médailles militaires

- Il suppose :
  - Le revenu saisi est le revenu net imposable (après abattement 10 % pour frais professionnels ou frais réels)
  - Tous les revenus relèvent du barème progressif (pas de flat tax sur plus-values mobilières, etc.)
  - La situation familiale est stable sur toute l'année fiscale
