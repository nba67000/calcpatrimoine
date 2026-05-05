# Rente viagère : comprendre le calcul avant de décider (guide 2026)

**Temps de lecture** : 12 minutes  
**Niveau** : Accessible avec formules détaillées  
**Dernière mise à jour** : 15 avril 2026

---

Vous avez 100 000 € sur un PER ou une assurance-vie. Votre conseiller vous propose de les convertir en rente viagère pour toucher 510 € par mois, à vie. D'où vient ce chiffre ?

Pas d'un chapeau, mais d'une formule actuarielle que les brochures commerciales n'ont pas l'habitude d'expliquer. Pourtant, comprendre ce calcul vous permet de prendre une décision éclairée — et parfois d'éviter des erreurs à plusieurs dizaines de milliers d'euros.

Dans cet article, on ouvre le capot. Formules, tables INSEE, code source, points d'attention. Tout ce qu'il faut savoir avant de signer.

---

## ⚠️ Avant de commencer : une clarification importante

Si vous êtes arrivé ici en cherchant « rente viagère », vous pensez peut-être à la vente de votre maison en viager (bouquet + rente mensuelle). Ce n'est **pas** le sujet de cet article.

On parle ici de **rente viagère financière** : transformer un capital (PER, assurance-vie, épargne) en revenus mensuels versés jusqu'à votre décès. Deux réalités différentes qui portent malheureusement le même nom.

Si c'est bien ça qui vous intéresse, continuons.

---

## Le principe de base

Imaginez 150 000 € d'épargne à la retraite. Deux chemins s'offrent à vous.

**Premier chemin** : vous gardez le capital et en retirez une partie chaque mois. La difficulté, c'est de calibrer le montant. Trop peu, et vous vous privez inutilement. Trop, et le capital s'épuise avant vous.

**Second chemin** : vous confiez les 150 000 € à un assureur qui vous garantit 750 € par mois jusqu'à votre dernier jour, quelle que soit votre longévité. En contrepartie, si vous décédez prématurément, l'assureur conserve le capital restant.

C'est ça, la rente viagère. Un transfert du risque de longévité vers l'assureur.

L'assureur supporte le risque que vous viviez très longtemps. Vous acceptez que le capital ne soit pas transmis à vos héritiers. C'est pourquoi on parle d'**assurance longévité** — une façon de garantir ses revenus jusqu'au bout, quelle que soit la durée.

---

## Comment l'assureur calcule le montant

Quand vous demandez une rente, l'assureur applique une formule actuarielle. Voici ce qui se passe réellement.

### La formule de base

```
Rente annuelle = Capital ÷ Facteur viager

R = C / a(x)
```

Exemple : 100 000 € à 65 ans.

Le facteur viager `a(x)` pour 65 ans est d'environ 16,29. Donc :

```
R = 100 000 / 16,29 = 6 140 € par an
Soit 512 € par mois
```

Simple. Mais d'où vient ce facteur `a(x)` ?

### Le calcul du facteur viager

Le facteur viager représente la **valeur actuelle** de tous les versements futurs, pondérés par votre probabilité de survie.

Concrètement : l'assureur calcule, année par année, la probabilité que vous soyez encore là pour toucher votre rente. Il actualise ensuite ces paiements futurs (1 € dans 20 ans ne vaut pas 1 € aujourd'hui).

La formule mathématique complète :

```
a(x) = Σ (t_px × v^t)  pour t = 0 à ω-x

Où :
- t_px = Probabilité de survie à t années
- v = 1/(1+i) = Facteur d'actualisation
- ω = Âge ultime (120 ans)
- i = Taux technique (souvent 0% aujourd'hui)
```

**Exemple concret** pour 65 ans (calcul simplifié sur 5 ans) :

| Année | Âge | Survie | Actualisation | Contribution |
|-------|-----|--------|---------------|--------------|
| 0 | 65 | 100% | 1.000 | 1.000 |
| 1 | 66 | 98.8% | 1.000 | 0.988 |
| 2 | 67 | 97.3% | 1.000 | 0.973 |
| 3 | 68 | 95.6% | 1.000 | 0.956 |
| 4 | 69 | 93.7% | 1.000 | 0.937 |
| 5 | 70 | 91.5% | 1.000 | 0.915 |

Facteur viager (5 ans) = 5.769

En réalité, le calcul court jusqu'à 120 ans, ce qui donne ~16,29 pour 65 ans.

### D'où viennent les probabilités de survie ?

De l'INSEE. Chaque année, l'institut publie des **tables de mortalité** construites à partir des décès réels enregistrés en France.

Pour 65 ans en 2022 (dernières données) :
- Taux de mortalité annuel : 1,23 %
- Probabilité de survie 1 an : 98,77 %
- Espérance de vie restante : 20,4 ans

Ces chiffres sont publics, consultables sur le site de l'INED. Les assureurs utilisent généralement les tables TGH05 et TGF05.

### Table de mortalité unisexe (depuis 2012)

Depuis le 21 décembre 2012, suite à un arrêt de la Cour de justice de l'Union européenne, les assureurs appliquent une **table de mortalité unisexe** pour calculer les rentes viagères.

**Avant la réforme** :
- 65 ans, 100 000 € (homme) → 614 €/mois
- 65 ans, 100 000 € (femme) → 551 €/mois

Les femmes ayant en moyenne une espérance de vie plus longue, la rente mensuelle était plus faible à capital égal — le total versé sur la durée restant comparable.

**Depuis décembre 2012** :
- 65 ans, 100 000 € (homme ou femme) → **580 €/mois** (table unisexe)

La Cour européenne a jugé cette différenciation contraire au principe d'égalité de traitement. La table unique repose sur une moyenne pondérée (48 % hommes, 52 % femmes selon la démographie française).

**Impact concret** :

| Profil | Avant 2012 | Depuis 2012 | Évolution |
|--------|-----------|-------------|-----------|
| 65 ans (homme) | 614 €/mois | 580 €/mois | -34 € (-6%) |
| 65 ans (femme) | 551 €/mois | 580 €/mois | +29 € (+5%) |

**Notre calculateur applique cette réglementation** : les montants affichés correspondent à ce qu'un assureur proposera en 2026, sans différenciation.

---

## Les paramètres qui changent tout

### 1. L'âge au moment de la conversion

Plus la conversion intervient tard, plus la rente mensuelle est élevée. L'assureur anticipe une durée de versement plus courte.

**Exemple pour 100 000 €** :

| Âge | Rente mensuelle | Par rapport à 60 ans |
|-----|----------------|----------------------|
| 60 ans | 390 € | — |
| 65 ans | 510 € | +31% |
| 70 ans | 680 € | +74% |
| 75 ans | 920 € | +136% |

Attendre de 60 à 70 ans presque double la rente. Mais pendant ces 10 ans, aucun versement n'est reçu. Ce point mérite réflexion selon votre situation.

### 2. Le taux technique

Certains contrats anciens garantissaient un taux technique de 1,5 % ou 2 %. L'assureur anticipait un rendement et proposait une rente initiale plus élevée, revalorisée plus faiblement ensuite.

**Impact du taux technique** (100 000 €, 65 ans) :

- Taux 0 % : 510 €/mois, revalorisé selon les résultats réels
- Taux 2 % : 615 €/mois (+20 %), revalorisation plus limitée

Depuis 2016, la majorité des nouveaux contrats sont à taux technique 0 %, les taux obligataires ne permettant plus de garantir 2 %.

### 3. La réversion

La réversion garantit qu'après votre décès, votre conjoint continue de toucher une partie de la rente (généralement 60 %, 80 % ou 100 %).

**Un point souvent mal compris** : la réversion est unidirectionnelle. Si votre conjoint décède avant vous, vous ne touchez pas davantage. Vous avez accepté une rente réduite pour une protection qui ne s'active que dans un sens.

**Exemple chiffré** (65 ans et 63 ans, 100 000 €, réversion 60 %) :

- Sans réversion : 510 €/mois
- Avec réversion : 385 €/mois (vivant), puis 231 €/mois (conjoint seul)

La différence est de **125 €/mois** (−24 %) pour une protection qui ne joue que si vous décédez en premier.

**La réversion a du sens si :**
- Votre conjoint n'a pas d'autres ressources propres
- Vous êtes nettement plus âgé (10 ans d'écart ou plus)
- Votre état de santé est plus fragile

**Elle mérite d'être réévaluée si :**
- Votre conjoint a déjà une retraite suffisante
- Vous avez le même âge et une santé comparable
- Vous êtes le plus jeune du couple

Une alternative à examiner : conserver la rente simple et souscrire une assurance décès temporaire (environ 30 €/mois pour 50 000 € de couverture). La transmission est garantie, sans réduire la rente.

---

## Fiscalité : ce que vous paierez vraiment

Les rentes viagères sont imposées, mais pas en totalité. L'administration fiscale considère qu'une fraction représente un remboursement du capital initial, exonérée à ce titre.

### Fraction imposable selon l'âge au 1er versement

| Âge | Part imposable | Part exonérée |
|-----|---------------|---------------|
| < 50 ans | 70% | 30% |
| 50–59 ans | 50% | 50% |
| 60–69 ans | 40% | 60% |
| ≥ 70 ans | 30% | 70% |

**Exemple concret** : 72 ans, rente de 800 €/mois.

```
Rente annuelle brute : 800 × 12 = 9 600 €
Part imposable (30%) : 2 880 €
Part exonérée (70%) : 6 720 €

Abattement 10% sur les 2 880 € : −288 €
Base imposable finale : 2 592 €

Impôt (TMI 30%) : 778 €/an, soit 65 €/mois
Rente nette : 800 − 65 = 735 €/mois
```

Plus la conversion intervient tard, plus la fraction exonérée est élevée. C'est l'un des rares mécanismes fiscaux qui récompensent une décision différée.

**Source officielle** : [Service-Public.fr — Rentes viagères](https://www.service-public.gouv.fr/particuliers/vosdroits/F3173)

---

## Rente, assurance-vie, PER : une comparaison honnête

Ces trois options répondent à des besoins différents. Voici un tableau factuel.

| Critère | Rente viagère | Assurance-vie (retraits) | PER (capital) |
|---------|--------------|--------------------------|---------------|
| **Revenus garantis à vie** | ✅ Oui | ❌ À piloter soi-même | ❌ À piloter soi-même |
| **Capital transmis aux héritiers** | ❌ Non (hors clauses spéciales) | ✅ Oui | ✅ Oui |
| **Flexibilité** | ❌ Irréversible | ✅ Totale | ⚠️ Bloqué jusqu'à la retraite |
| **Fiscalité** | ⭐⭐⭐⭐ (30–70% exo) | ⭐⭐⭐ (PFU 30%) | ⭐⭐⭐⭐⭐ (IR après abattement) |
| **Risque de marché** | ✅ Aucun | ⚠️ Selon fonds | ⚠️ Selon fonds |
| **Gestion au quotidien** | ✅ Aucune | ❌ À assurer | ❌ À assurer |

### Scénarios comparés (100 000 €, 65 ans)

**Scénario A : Décès à 75 ans (10 ans de rente)**

- Rente viagère : 510 € × 12 × 10 = 61 200 € reçus
- Assurance-vie : capital intact + rendements, transmis aux héritiers
- **Assurance-vie plus avantageuse dans ce scénario**

**Scénario B : Décès à 85 ans (espérance de vie moyenne)**

- Rente viagère : 510 € × 12 × 20 = 122 400 € reçus
- Assurance-vie : capital épuisé vers 82 ans (retraits de 500 €/mois)
- **Résultat comparable, légèrement favorable à la rente**

**Scénario C : Décès à 98 ans**

- Rente viagère : 510 € × 12 × 33 = 201 960 € reçus
- Assurance-vie : capital épuisé depuis 82 ans, rien depuis 16 ans
- **Rente viagère nettement plus avantageuse**

La rente viagère est d'autant plus favorable que la longévité est élevée. C'est structurellement ainsi — c'est la nature même du produit, pas un défaut.

---

## Quand la rente viagère correspond à votre situation

La rente n'est pas universellement adaptée. Voici les cas où elle peut être pertinente.

### ✅ La rente mérite d'être étudiée si :

1. **Votre famille a une longévité marquée**  
   Parents ou grands-parents ayant dépassé 90 ans. Une longévité familiale élevée change sensiblement le calcul.

2. **Vous n'avez pas d'héritiers directs à protéger**  
   Célibataire, sans enfants, ou des enfants financièrement autonomes. La question de la transmission du capital se pose moins.

3. **Vous préférez la sécurité à la performance**  
   Gérer un capital sur 30 ans demande une implication continue. Certains préfèrent un revenu garanti, même si le rendement attendu est moindre. C'est un choix légitime.

4. **Vous avez 70 ans ou plus**  
   La fiscalité devient très avantageuse (70 % exonéré) et la rente mensuelle élevée. Le rapport devient plus favorable à cet âge.

5. **La rente est un complément, pas votre seule ressource**  
   Si elle s'avère moins rentable que prévu, l'impact sur votre budget reste limité.

---

## Les situations où d'autres options semblent mieux adaptées

### ❌ La rente mérite d'être mise de côté si :

1. **Vous avez moins de 65 ans**  
   Patienter 5 à 10 ans peut augmenter la rente de 30 à 50 %. Sauf besoin pressant, différer peut être judicieux.

2. **Vous avez des proches qui dépendent de votre patrimoine**  
   100 000 € convertis en rente = 0 € transmis. Si la protection de vos proches est prioritaire, l'assurance-vie offre plus de souplesse.

3. **Votre état de santé est fragilisé**  
   Une espérance de vie inférieure à la moyenne rend la rente mathématiquement moins intéressante. C'est un fait, pas un jugement.

4. **Vous tenez à garder la maîtrise de votre patrimoine**  
   La conversion est irréversible. Si votre situation est susceptible d'évoluer (projets, besoins de liquidités), la flexibilité a une valeur en soi.

5. **Vous anticipez des besoins de capital à court ou moyen terme**  
   Une fois convertie, la rente ne peut pas être rachetée. Si un besoin ponctuel important est possible, c'est un point à peser.

---

## Les 5 points d'attention avant de signer

### 1. L'âge de souscription (impact majeur)

**Exemple** : Sophie, 60 ans, envisage de convertir 150 000 €.

- Rente à 60 ans : 585 €/mois
- Si elle attendait 70 ans : 1 020 €/mois (+74 %)

La différence est de 435 €/mois, soit 5 220 €/an. Sur 20 ans : **104 400 € d'écart**.

Pendant les 10 années d'attente, elle peut vivre sur des retraits programmés (500 €/mois = 60 000 € sur 10 ans). Il lui reste 90 000 € à 70 ans, convertis en 780 €/mois — encore supérieur aux 585 € initiaux.

Sauf besoin immédiat, différer la conversion est souvent la décision la plus avantageuse.

### 2. La réversion : calibrer le besoin réel

**Exemple** : Marc (65 ans) et Julie (64 ans). Marc souscrit avec réversion 60 % pour Julie.

- Sans réversion : 680 €/mois
- Avec réversion : 510 €/mois

Marc accepte 170 €/mois de moins. Sur 20 ans : **40 800 €**.

Si Julie a sa propre retraite et une assurance-vie, la protection est peut-être surdimensionnée. La réversion se justifie quand le besoin est réel — pas par précaution automatique.

### 3. Les frais : comparer les contrats

Certains contrats prélèvent des frais sur la conversion (1 à 3 %) et des frais de gestion annuels (0,5 à 1 %). Sur 100 000 €, cela représente 1 000 à 3 000 € prélevés dès le départ.

Les frais varient significativement d'un assureur à l'autre. Comparer plusieurs offres est utile.

### 4. La revalorisation : vérifier la clause

La rente initiale est revalorisée chaque année selon les résultats financiers de l'assureur, généralement indexée sur l'IPC (Indice des Prix à la Consommation).

**Exemple** : Rente de 800 € en 2020, IPC +2,85 % en 2021.

```
Nouvelle rente = 800 × 1,0285 = 822,80 €
```

Sur 20 ans avec une inflation de 2 %/an, la rente augmente substantiellement. Il vaut la peine de vérifier que le contrat prévoit bien cette revalorisation.

### 5. L'option dépendance : une garantie à évaluer

Certains contrats proposent une majoration en cas de dépendance (perte d'autonomie) : la rente augmente alors de 30 à 50 %. Cela représente généralement 3 à 5 % de rente en moins au départ.

Si vous n'avez pas d'assurance dépendance par ailleurs et que vous approchez de 70 ans, cette option peut valoir la peine d'être examinée.

---

## Comment calculer votre rente

Plutôt que de vous fier à une estimation verbale, vous pouvez calculer vous-même avant toute réunion avec un conseiller.

J'ai créé **CalcPatrimoine** pour ça. Un calculateur gratuit, sans inscription, basé sur les formules actuarielles réelles et les tables INSEE 2022.

**3 modes de calcul** :

1. **Mode classique** : Capital → Rente mensuelle
2. **Mode inverse** : Rente souhaitée → Capital nécessaire
3. **Mode couple** : 7 stratégies comparées

**Transparence totale** :
- Code open-source sur GitHub
- Formules affichées
- Tables INSEE 2022 officielles
- Aucune donnée collectée

👉 **[calculpatrimoine.fr](https://calculpatrimoine.fr)**

---

## Questions fréquentes

### Puis-je récupérer mon capital si je change d'avis ?

**Non**. La conversion est irréversible. Une fois signée, il n'est pas possible de revenir en arrière.

Il existe une exception rare : la **clause annuités garanties**. Si vous décédez dans les premières années (souvent 10 ans), vos héritiers reçoivent le solde restant. En contrepartie, la rente initiale est réduite de 10 à 15 %.

### La rente est-elle revalorisée chaque année ?

**Oui**, c'est une obligation légale (Code des assurances, article A331-5). La revalorisation suit généralement l'IPC, mais dépend aussi des résultats financiers de l'assureur.

Un taux technique élevé garanti à l'entrée avec une revalorisation limitée ensuite peut s'avérer moins favorable qu'un taux 0 % bien revalorisé. L'historique de revalorisation de l'assureur est un indicateur utile.

### Que se passe-t-il si mon assureur fait faillite ?

Vos rentes sont protégées par le **Fonds de Garantie des Assurances de Personnes (FGAP)** jusqu'à 70 000 € par assuré.

Au-delà, une répartition sur deux assureurs distincts peut limiter ce risque : deux rentes de 510 € offrent une protection plus large qu'une seule de 1 020 €.

### Quelle différence entre rente PER et rente assurance-vie ?

**Sur le plan fiscal** :

- **Rente PER** : imposée comme une pension de retraite (abattement 10 %)
- **Rente assurance-vie** : imposée selon la fraction en fonction de l'âge (30 à 70 % exonéré)

À 70 ans, la rente assurance-vie est généralement plus avantageuse fiscalement. Le PER, en revanche, permet de déduire les versements pendant la vie active — l'avantage se situe à l'entrée, pas à la sortie.

Le bon choix dépend de votre TMI actuel par rapport à celui attendu à la retraite.

### La réversion est-elle obligatoire ?

**Non**. C'est une option. Vous pouvez très bien souscrire une rente simple, sans protection du conjoint. La rente mensuelle sera plus élevée, mais rien ne sera versé après votre décès.

### Puis-je cumuler rente viagère et activité professionnelle ?

**Oui**, sans restriction. La rente viagère n'est pas liée à votre statut professionnel.

À noter : si vos revenus d'activité sont significatifs, les combiner avec une rente peut vous faire changer de tranche fiscale. C'est un point à vérifier selon votre situation.

---

## Ce qu'il faut retenir

1. **La rente viagère transforme un capital en revenus garantis à vie**. En contrepartie, le capital n'est pas transmis (sauf clause spécifique).

2. **La formule est directe** : Rente = Capital / Facteur viager. Le facteur dépend de l'âge et des tables INSEE.

3. **L'âge de conversion est le levier le plus puissant**. Une différence de 10 ans peut représenter +30 à +50 % de rente mensuelle.

4. **La réversion réduit la rente** (−15 à −30 %) et ne s'applique que dans un sens. Elle mérite d'être calibrée au besoin réel.

5. **La fiscalité est favorable après 70 ans** : 70 % de la rente est exonérée d'impôt.

6. **La rente est d'autant plus avantageuse que la longévité est élevée**. C'est la logique du produit.

7. **La décision est irréversible**. C'est le point le plus important à intégrer avant de signer.

8. **Comparer avec l'assurance-vie et le PER** selon votre situation personnelle (héritiers, besoins de flexibilité, état de santé, âge) est essentiel.

9. **Les frais varient significativement** d'un contrat à l'autre. Comparer plusieurs offres est utile.

10. **Simuler avant de décider** avec un outil transparent vous donne une base solide pour les discussions avec votre conseiller.

---

## Pour aller plus loin

**Calculateurs** :
- [CalcPatrimoine](https://calculpatrimoine.fr) — Simulateur gratuit, code open-source

**Sources officielles** :
- [Tables INSEE 2022](https://www.ined.fr/fr/tout-savoir-population/graphiques-cartes/graphiques-interpretes/esperance-vie-france/) — Espérance de vie par âge
- [Service-Public.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F3173) — Fiscalité rentes viagères
- Code des assurances, articles A331-1 à A331-11 — Réglementation rentes

**Lecture complémentaire** :
- Louis Esch, *Calcul actuariel*, pages 15–22 (formules détaillées)
- [ACPR](https://acpr.banque-france.fr/) — Autorité de contrôle des assurances

**Code source** :
- [GitHub CalcPatrimoine](https://github.com/nba67000/calculpatrimoine) — Formules Python, tables JSON

---

**Publié le** : 15 avril 2026  
**Auteur** : CalcPatrimoine  
**Licence** : Creative Commons BY-NC-SA 4.0

*Cet article est fourni à titre informatif uniquement. Il ne constitue pas un conseil en investissement. Consultez un conseiller financier indépendant avant toute décision patrimoniale importante.*
