# URLs externes à reconstruire

Liste des URLs Légifrance/BOFiP cassées identifiées par le crawl du **2026-05-31**.
Toutes ces entrées ont vu leur `href`/`url` et `desc`/`sujet` retirés du code
(option A — quick fix). Seul le **label / référence textuelle** reste affiché à
l'utilisateur. À reconstruire dans une passe ultérieure dédiée.

## Méthode pour reconstruire

Pour chaque article : aller sur https://www.legifrance.gouv.fr/, chercher
l'article par numéro + code, récupérer l'URL stable de la version actuellement
en vigueur. Tester avec WebFetch (ou simple curl) avant de remettre en code.

Pour les BOFiP : utiliser l'**identifiant BOI-XXX complet** dans l'URL (pas
seulement `<id>-PGP.html` qui re-route vers le mauvais document).

---

## Légifrance — articles confirmés morts (HTTP 404)

| Article | Ancien LEGIARTI | Fichiers à mettre à jour quand l'URL valide est trouvée |
|---|---|---|
| Art 125-0 A CGI (rachat AV) | LEGIARTI000047956718 | `src/lib/assuranceVie.ts`, `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` (×3), `src/app/faq/assurance-vie/page.tsx` |
| Art L136-7 CSS (prélèvements sociaux) | LEGIARTI000047958086 | `src/lib/assuranceVie.ts`, `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` |
| Art L136-7 CSS (autre version) | LEGIARTI000037985080 | `docs/sources/assurance-vie-fiscalite-rachat.md` |
| Art 163 quatervicies CGI (déduction PER) | LEGIARTI000048776042 | `src/lib/per.ts`, `docs/sources/per-individuel.md` |
| Art 163 quatervicies CGI (autre version) | LEGIARTI000037985573 | `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` (×2) |
| Art L224-1 CMF (définition PER) | LEGIARTI000038612513 | `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` |
| Art 158-5° bis CGI (rentes/pensions) | LEGIARTI000044979614 | `src/app/blog/per-...`, `src/app/blog/rente-viagere-seuil-rentabilite/page.tsx` |
| Art 964 CGI (seuil IFI) | LEGIARTI000036472764 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 977 CGI (barème IFI) | LEGIARTI000036473012 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 973 CGI (abattement RP IFI) | LEGIARTI000036472780 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 974 CGI (dettes IFI) | LEGIARTI000036472786 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 979 CGI (plafond IFI+IR) | LEGIARTI000036473018 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 777 CGI (barème donation/succession) | LEGIARTI000041464063 | `src/lib/donation.ts`, `docs/sources/donation-droits.md` |
| Art 779 CGI (abattements donation) | LEGIARTI000048845104 | `src/lib/donation.ts`, `docs/sources/donation-droits.md` |
| Art 784 CGI (rappel 15 ans) | LEGIARTI000041464760 | `src/lib/donation.ts`, `docs/sources/donation-droits.md` |
| Art 790 G CGI (don familial) | LEGIARTI000041464661 | `src/lib/donation.ts`, `docs/sources/donation-droits.md` |
| Art 990 I CGI (AV avant 70 ans) | LEGIARTI000045583309 | `src/lib/assuranceVie.ts`, `src/lib/transmission.ts`, `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` |

## Légifrance — articles confirmés pointant vers le MAUVAIS contenu

| Référence annoncée | LEGIARTI utilisé | Affiche en réalité | Fichiers |
|---|---|---|---|
| Art 194 CGI (quotient familial) | LEGIARTI000006302756 | Art 150-0 F (plus-values OPCVM) | `src/lib/tmi.ts`, `docs/sources/tmi.md` |
| Art 196 CGI (parts) | LEGIARTI000006302765 | Art 150 N bis (**abrogé en 2003**) | `docs/sources/tmi.md` (pas dans le code lib) |
| Art 757 B CGI (AV après 70 ans) | LEGIARTI000006305484 | Art 796 (exonération militaires) | `src/lib/transmission.ts` |

## BOFiP — identifiants à reconstruire (URL OK mais re-route vers mauvais document)

| Référence | URL morte | Contenu réel affiché | Fichiers |
|---|---|---|---|
| BOI-RPPM-RCM-20-10-20 | `bofip/2823-PGP.html` | BNC - Champ d'application | `src/lib/assuranceVie.ts`, `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` (×2), `src/app/faq/assurance-vie/page.tsx` |
| BOI-ENR-DMTG-20-30-20-20 | `bofip/3845-PGP.html` | RPPM - PV biens meubles incorporels | `src/lib/donation.ts`, `docs/sources/donation-droits.md` |

**Règle apprise** : toujours utiliser l'URL avec identifiant complet
(`?identifiant=BOI-XXX-XX-XX-DATEMILLESIME`). Les URLs nues `<id>-PGP.html` ne
sont pas stables.

---

## À tester (non encore validés au 2026-05-31)

URLs présentes dans le code mais non testées lors du crawl initial. Si le pattern
constaté se confirme (~80 % de cassés), la plupart sont probablement à reconstruire
aussi. À passer dans la prochaine session crawl.

### Lib files

| Article | LEGIARTI | Fichier |
|---|---|---|
| Art 790 E CGI (don entre époux) | LEGIARTI000038588107 | `src/lib/donation.ts` |
| Art 83 CGI (frais professionnels) | LEGIARTI000044986838 | `src/lib/per.ts` |
| Articles L.224-1 et s. CMF (section) | LEGITEXT000006072026/LEGISCTA000038619671/ | `src/lib/per.ts` |
| Art 195 CGI (section) | LEGISCTA000006179579/ | `src/lib/tmi.ts` |
| Art 150 VB CGI | LEGIARTI000053544785 | `src/lib/plusValueImmobiliere.ts` |
| Art L136-7 CSS VI 2 (abattements PS PV immo) | LEGIARTI000053584839 | `src/lib/plusValueImmobiliere.ts` |
| Art 150 VD CGI (moins-values immo) | LEGIARTI000047970809 | `src/lib/plusValueImmobiliere.ts` |
| Articles 777 et s. (succession) | LEGIARTI000042160878 | `src/lib/transmission.ts` |
| Art A132-1 Code des assurances (taux technique rente) | LEGIARTI000035514601 | `src/lib/mortality.ts` |
| Arrêté 1er août 2006 (tables TGH/TGF) | JORFTEXT000000820127 | `src/lib/mortality.ts` |
| Loi 2011-1906 (tables unisexes) | JORFTEXT000023744555 | `src/lib/mortality.ts` |
| Loi TEPA 2007 (lib) | JORFTEXT000000278649 | `src/lib/transmission.ts` |
| Loi TEPA 2007 (docs) | JORFTEXT000000872484 | `docs/sources/assurance-vie-transmission.md` (⚠ ID différent de la lib !) |
| Loi de finances 2018 art. 28 | JORFTEXT000036339197 | `src/lib/assuranceVie.ts`, `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` |
| Art 990 I CGI (transmission docs) | LEGIARTI000047288653 | `docs/sources/assurance-vie-transmission.md`, `src/config/chatResources.ts` |
| Art 757 B CGI (transmission docs) | LEGIARTI000047288569 | `docs/sources/assurance-vie-transmission.md`, `src/config/chatResources.ts` |
| Art 990 I CGI v?6292566 | LEGIARTI000026292566 | `docs/sources/assurance-vie-transmission.md` |
| Art 777 CGI v?4981950 | LEGIARTI000044981950 | `docs/sources/assurance-vie-transmission.md`, `src/config/chatResources.ts` |
| Art 779 CGI v?26292566 | LEGIARTI000026292566 | `src/config/chatResources.ts` |
| Art 163 quatervicies CGI v?7605786 | LEGIARTI000047605786 | `src/config/chatResources.ts` |
| Art 197 CGI v?4981244 | LEGIARTI000044981244 | `src/config/chatResources.ts` |
| Art L224-28 CMF (déblocage anticipé PER) | LEGIARTI000048805604 | `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` |
| Art 158, 5° bis CGI v?42158853 | LEGIARTI000042158853 | `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` |

### BOFiP

| Référence | URL | Fichier |
|---|---|---|
| BOFiP donation | `bofip/3837-PGP.html` | `docs/sources/donation-droits.md` |
| BOFiP IFI | `bofip/11225-PGP.html` | `docs/sources/ifi.md` |
| BOFiP TMI | `bofip/2494-PGP.html/identifiant=BOI-IR-LIQ-20-20-20-20260407` | `docs/sources/tmi.md` |
| BOFiP TMI décote | `bofip/2495-PGP.html/identifiant=BOI-IR-LIQ-20-20-30-20250414` | `src/lib/tmi.ts`, `docs/sources/tmi.md` |
| BOFiP actu LF 2026 | `bofip/14954-PGP.html/ACTU-2026-00022` | `docs/sources/tmi.md` |
| BOFiP PER | `bofip/2108-PGP.html/identifiant=BOI-IR-BASE-20-50-10` | `docs/sources/per-individuel.md` |
| BOFiP PER (blog) | `bofip/10261-PGP.html` | `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` |
| BOFiP PV immo | `bofip/208-PGP.html/identifiant=BOI-RFPI-PVI` (+ 2 variantes) | `docs/sources/plus-value-immobiliere.md` |
| BOFiP transmission | `bofip/3296-PGP.html` | `src/lib/transmission.ts` |

---

## ✅ URLs confirmées OK (à ne pas toucher)

- Art 125-0 A CGI (LEGIARTI000044989424) — `docs/sources/assurance-vie-fiscalite-rachat.md`
- Art 163 quatervicies CGI (LEGIARTI000053542827) — `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` sources
- Art L224-1 CMF (LEGIARTI000038507575) — `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` sources
- Art 197 CGI (LEGIARTI000051212954) — `src/lib/tmi.ts` ⚠ version 2025 (à actualiser pour version 2026)
- Art 150 U CGI (LEGIARTI000053544910) — `src/lib/plusValueImmobiliere.ts`, `src/config/chatResources.ts`
- Art 1609 nonies G CGI (LEGIARTI000048806252) — `src/lib/plusValueImmobiliere.ts`, `src/config/chatResources.ts`
- Art 158 CGI (LEGIARTI000053542725) — `src/lib/mortality.ts`
- BOFiP BOI-RPPM-RCM-20-10-20-50 (3951-PGP avec identifiant) — `src/lib/assuranceVie.ts`, `src/config/chatResources.ts`
- BOFiP BOI-IR-LIQ-20-10 (2491-PGP avec identifiant) — `src/lib/tmi.ts`, `docs/sources/tmi.md`
