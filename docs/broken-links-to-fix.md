# URLs externes à reconstruire

Liste consolidée des URLs Légifrance/BOFiP cassées identifiées par les crawls
**2026-05-31** (3 rounds, ~54 URLs testées au total). Toutes les entrées
cassées ont vu leur `href`/`url` et `desc`/`sujet` retirés du code (option A —
quick fix). Seul le **label / référence textuelle** reste affiché à l'utilisateur.

## Méthode pour reconstruire

Pour chaque article : aller sur https://www.legifrance.gouv.fr/, chercher
l'article par numéro + code, récupérer l'URL stable de la version actuellement
en vigueur. Tester avec WebFetch avant de remettre en code.

Pour les BOFiP : toujours utiliser l'**identifiant BOI-XXX complet** dans l'URL
(`?identifiant=BOI-XXX-XX-XX-DATEMILLESIME`). Les URLs nues `<id>-PGP.html` ne
sont pas stables et re-routent souvent vers le mauvais document.

---

## ✅ URLs restaurées dans le code suite au crawl du 2026-05-31

3 articles ont retrouvé un LEGIARTI valide (identifiants alternatifs déjà
présents dans `docs/sources/` ou `chatResources.ts`) :

| Article | LEGIARTI valide | Restauré dans |
|---|---|---|
| Art 990 I CGI | LEGIARTI000047288653 | `src/lib/assuranceVie.ts`, `src/lib/transmission.ts`, `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` (×2), `src/config/chatResources.ts` |
| Art 757 B CGI | LEGIARTI000047288569 | `src/lib/transmission.ts`, `src/config/chatResources.ts` |
| Art 779 CGI | LEGIARTI000026292566 | `src/lib/donation.ts`, `src/config/chatResources.ts` |

---

## ❌ Légifrance — articles confirmés morts (HTTP 404)

| Article | Ancien LEGIARTI | Fichiers à mettre à jour quand l'URL valide est trouvée |
|---|---|---|
| Art 125-0 A CGI (rachat AV) | LEGIARTI000047956718 | `src/lib/assuranceVie.ts`, `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` (×3), `src/app/faq/assurance-vie/page.tsx` |
| Art L136-7 CSS (prélèvements sociaux) | LEGIARTI000047958086 | `src/lib/assuranceVie.ts`, `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` |
| Art L136-7 CSS (autre version) | LEGIARTI000037985080 | `docs/sources/assurance-vie-fiscalite-rachat.md` |
| Art 163 quatervicies CGI (déduction PER) | LEGIARTI000048776042 | `src/lib/per.ts`, `docs/sources/per-individuel.md` |
| Art 163 quatervicies CGI (chatResources) | LEGIARTI000047605786 | `src/config/chatResources.ts` |
| Art 163 quatervicies CGI (blog) | LEGIARTI000037985573 | `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` (×2) |
| Art L224-1 CMF (blog) | LEGIARTI000038612513 | `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` |
| Art 158-5° bis CGI | LEGIARTI000044979614 | `src/app/blog/per-...`, `src/app/blog/rente-viagere-seuil-rentabilite/page.tsx` |
| Art 964 CGI (seuil IFI) | LEGIARTI000036472764 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 977 CGI (barème IFI) | LEGIARTI000036473012 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 973 CGI (abattement RP IFI) | LEGIARTI000036472780 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 974 CGI (dettes IFI) | LEGIARTI000036472786 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 979 CGI (plafond IFI+IR) | LEGIARTI000036473018 | `src/lib/ifi.ts`, `docs/sources/ifi.md` |
| Art 777 CGI (donation lib) | LEGIARTI000041464063 | `src/lib/donation.ts`, `docs/sources/donation-droits.md` |
| Art 777 CGI (chatResources) | LEGIARTI000044981950 | `src/config/chatResources.ts` |
| Art 779 CGI (lib version) | LEGIARTI000048845104 | `docs/sources/donation-droits.md` (le lib utilise désormais la version `26292566` qui fonctionne) |
| Art 784 CGI (rappel 15 ans) | LEGIARTI000041464760 | `src/lib/donation.ts`, `docs/sources/donation-droits.md` |
| Art 790 G CGI (don familial) | LEGIARTI000041464661 | `src/lib/donation.ts`, `docs/sources/donation-droits.md` |
| Art 790 E CGI (don entre époux) | LEGIARTI000038588107 | `src/lib/donation.ts` |
| Art 990 I CGI (lib version) | LEGIARTI000045583309 | `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` source — les libs utilisent désormais la version `47288653` qui fonctionne |
| Art 83 CGI (frais professionnels) | LEGIARTI000044986838 | `src/lib/per.ts` |
| Articles L.224-1 et s. CMF (section) | LEGITEXT000006072026/LEGISCTA000038619671/ | `src/lib/per.ts` |
| Articles 777 et s. (transmission) | LEGIARTI000042160878 | `src/lib/transmission.ts` |
| Art 197 CGI (chatResources) | LEGIARTI000044981244 | `src/config/chatResources.ts` |

## ⚠️ Légifrance — articles confirmés pointant vers le MAUVAIS contenu

| Référence annoncée | LEGIARTI utilisé | Affiche en réalité | Fichiers |
|---|---|---|---|
| Art 194 CGI (quotient familial) | LEGIARTI000006302756 | Art 150-0 F (PV OPCVM) | `src/lib/tmi.ts`, `docs/sources/tmi.md` |
| Art 196 CGI (parts) | LEGIARTI000006302765 | Art 150 N bis (**abrogé en 2003**) | `docs/sources/tmi.md` |
| Art 757 B CGI (lib version) | LEGIARTI000006305484 | Art 796 (exonération militaires) | (corrigé : lib utilise désormais `47288569`) |
| Art 195 CGI (section) | LEGISCTA000006179579/ | Art 200 A (valeurs mobilières) | `src/lib/tmi.ts` |
| Art 158 5° bis CGI (blog) | LEGIARTI000042158853 | Art 156 (section générique) | `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` |
| Loi 2011-1906 (tables unisexes) | JORFTEXT000023744555 | "Pas de contenu disponible" | `src/lib/mortality.ts` |
| Loi TEPA 2007 (docs version) | JORFTEXT000000872484 | Décret n°84-752 (Ministre Affaires européennes 1984) | `docs/sources/assurance-vie-transmission.md` |

## ⚠️ BOFiP — identifiants à reconstruire (URL OK mais re-route vers mauvais doc)

| Référence | URL morte | Contenu réel affiché | Fichiers |
|---|---|---|---|
| BOI-RPPM-RCM-20-10-20 | `bofip/2823-PGP.html` | BNC - Champ d'application | `src/lib/assuranceVie.ts`, `src/app/blog/assurance-vie-fiscalite-rachat/page.tsx` (×2), `src/app/faq/assurance-vie/page.tsx` |
| BOI-ENR-DMTG-20-30-20-20 | `bofip/3845-PGP.html` | RPPM - PV biens meubles incorporels | `src/lib/donation.ts`, `docs/sources/donation-droits.md` |
| BOFiP-Assurance-vie et successions | `bofip/3296-PGP.html` | ENR-DMTOI-10-70-60 (coopératives agricoles) | `src/lib/transmission.ts` |
| BOFiP RSA-PENS-10 (PER blog) | `bofip/10261-PGP.html` | Convention fiscale France-Andorre | `src/app/blog/per-individuel-deduction-fiscalite/page.tsx` |

## ❌ BOFiP — HTTP 404

| Référence | URL morte | Fichiers |
|---|---|---|
| BOFiP IFI | `bofip/11225-PGP.html` | `docs/sources/ifi.md` |
| BOFiP PER (docs) | `bofip/2108-PGP.html/identifiant=BOI-IR-BASE-20-50-10` | `docs/sources/per-individuel.md` |
| BOFiP PV immo | `bofip/208-PGP.html/identifiant=BOI-RFPI-PVI` | `docs/sources/plus-value-immobiliere.md` |

---

## ✅ URLs confirmées OK (validées par les 3 rounds de crawl 2026-05-31)

### Légifrance — articles
- Art 125-0 A CGI (LEGIARTI000044989424) — `docs/sources/`, `src/config/chatResources.ts`
- Art 197 CGI (LEGIARTI000051212954) — `src/lib/tmi.ts` ⚠ version 2025 (à actualiser pour le millésime 2026 si nécessaire)
- Art 150 U CGI (LEGIARTI000053544910) — `src/lib/plusValueImmobiliere.ts`, `src/config/chatResources.ts`
- Art 150 VB CGI (LEGIARTI000053544785) — `src/lib/plusValueImmobiliere.ts`
- Art 150 VD CGI (LEGIARTI000047970809) — `src/lib/plusValueImmobiliere.ts`
- Art L136-7 CSS VI 2 (LEGIARTI000053584839) — `src/lib/plusValueImmobiliere.ts`
- Art 1609 nonies G CGI (LEGIARTI000048806252) — `src/lib/plusValueImmobiliere.ts`, `src/config/chatResources.ts`
- Art 158 CGI (LEGIARTI000053542725) — `src/lib/mortality.ts`
- Art A132-1 Code des assurances (LEGIARTI000035514601) — `src/lib/mortality.ts`
- Art 163 quatervicies CGI (LEGIARTI000053542827) — `src/app/blog/per-individuel-deduction-fiscalite/page.tsx`
- Art L224-1 CMF (LEGIARTI000038507575) — `src/app/blog/per-individuel-deduction-fiscalite/page.tsx`
- Art L224-28 CMF (LEGIARTI000048805604) — `src/app/blog/per-individuel-deduction-fiscalite/page.tsx`
- **Art 990 I CGI** (LEGIARTI000047288653) — RESTAURÉ dans libs + blog + chatResources
- **Art 757 B CGI** (LEGIARTI000047288569) — RESTAURÉ dans lib + chatResources
- **Art 779 CGI** (LEGIARTI000026292566) — RESTAURÉ dans lib + chatResources

### Légifrance — lois
- Loi TEPA 2007 (JORFTEXT000000278649) — `src/lib/transmission.ts`
- Loi de finances 2018 art. 28 (JORFTEXT000036339197) — `src/lib/assuranceVie.ts`, blog
- Arrêté 1er août 2006 tables TGH/TGF (JORFTEXT000000820127) — `src/lib/mortality.ts`

### BOFiP (avec identifiant complet)
- BOI-RPPM-RCM-20-10-20-50 (3951-PGP) — `src/lib/assuranceVie.ts`, `src/config/chatResources.ts`
- BOI-IR-LIQ-20-10 (2491-PGP) — `src/lib/tmi.ts`, `docs/sources/tmi.md`
- BOI-IR-LIQ-20-20-30 (2495-PGP) — `src/lib/tmi.ts`, `docs/sources/tmi.md`
- BOI-IR-LIQ-20-20-20 (2494-PGP) — `docs/sources/tmi.md`

---

## URLs encore non testées (à valider lors d'une prochaine session)

Très peu : il reste essentiellement quelques URLs Service-Public et docs/sources
non critiques. Sans signal contraire, on les considère OK par défaut tant que
personne ne remonte de problème (ces URLs sont historiquement stables) :

- service-public.fr fiches : F14203, F22414, F3173, F10864, F34982
- insee.fr / ined.fr (URLs INSEE et INED — formats historiques stables)
- bofip/14954-PGP.html/ACTU-2026-00022 (actualité TMI, dans docs seulement)
- LEGIARTI000047970756 (Art 150 VC CGI, dans `chatResources.ts` et `src/lib/plusValueImmobiliere.ts`) — cohérent avec le pattern Art 150 VB/VD qui sont OK, probablement OK aussi

---

## Statistiques crawl 2026-05-31

- **Total URLs testées** : ~54 (sur les 3 rounds)
- **OK** : ~21 (39 %)
- **HTTP 404** : ~27 (50 %)
- **Pointant vers mauvais contenu** : ~9 (17 %)
- **Confirmées via crawl mais déjà OK dans le code** : 11
- **Restaurées dans le code** (URLs alternatives valides) : 3 articles, ~7 occurrences
- **Nouvellement strippées du code** suite aux rounds 2-3 : 11 URLs
