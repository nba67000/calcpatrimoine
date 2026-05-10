---
description: Détecte les patterns AI-slop dans le contenu éditorial de CalcPatrimoine — généricité, conseillisme, imprécision fiscale, padding. Complémentaire à /trois-freres.
---

# /anti-ai-slop

Tu audites le contenu éditorial de CalcPatrimoine pour détecter les patterns **AI-slop spécifiques à ce projet** : non pas si un texte sonne comme une IA, mais s'il est vague là où il devrait être précis, conseilliste là où il doit rester factuel, ou générique là où il devrait être ancré dans ce calculateur en particulier.

**Différence avec `/trois-freres`** :
- `/trois-freres` → le texte est-il compréhensible ? (jargon, phrases longues)
- `/anti-ai-slop` → le texte mérite-t-il sa place ? (valeur, précision, positionnement)

---

## Périmètre

**Analyser :**
- Metadata SEO : `title` et `description` dans les `metadata` de chaque `src/app/*/page.tsx`
- Introductions, sous-titres, descriptions de features sur les pages calculateur
- Sections "Comment ça marche", "Méthodologie", "Exemples"
- Warnings et messages d'optimisation dans `src/components/Calculator/*.tsx`

**Ne pas analyser :**
- La logique de calcul (`src/lib/`)
- Les commentaires de code
- `docs/sources/` (périmètre de `/verif-sources`)
- Le contenu juridique de `src/components/LegalDisclaimer.tsx`

---

## Signaux à détecter

### 1. Conseillisme déguisé

Le texte glisse vers une recommandation alors que le site informe et ne conseille jamais.

Mots-déclencheurs :
- "il est préférable de", "pensez à", "n'oubliez pas de", "nous vous recommandons"
- "pour optimiser votre situation", "idéalement", "il vaut mieux", "le plus avantageux"
- Impératif non-factuel : "choisissez", "optez pour", "évitez de"

Reformulation attendue : "l'option X aboutit à Y€ d'impôt en moins" — jamais "choisissez l'option X".

### 2. Imprécision fiscale

Des taux, seuils ou règles cités sans ancrage dans un texte de loi vérifiable.

Marqueurs :
- "environ X %", "généralement", "dans la plupart des cas", "souvent"
- Taux ou seuil éditorial sans référence entre parenthèses (Art. CGI, BOFiP)
- "les règles peuvent varier selon les situations" sans préciser lesquelles ni pourquoi

Règle : tout chiffre cité dans une section explicative doit être sourcé ou renvoyer au bloc sources en bas de page.

### 3. Généricité de simulateur

Un paragraphe qui pourrait figurer mot pour mot sur n'importe quel site fiscal, sans rien de spécifique à CE calculateur.

Marqueurs :
- "cet outil vous permet de calculer facilement..."
- "grâce à notre simulateur, vous saurez en quelques clics..."
- Introduction qui décrit la fonctionnalité (ce que l'UI montre déjà) plutôt que le cas d'usage réel
- Listes de features creuses : "simple", "rapide", "gratuit", "intuitif"

Test : est-ce que ce paragraphe serait identique sur le calculateur TMI, sur celui de l'IFI, sur un site concurrent ? Si oui, c'est du slop.

### 4. Padding qui double l'UI

Une phrase ou section qui répète ce que les champs de saisie, les résultats ou le titre disent déjà.

Marqueurs :
- "Entrez vos données pour obtenir vos résultats" (évidence totale)
- Section "En résumé" qui recopie les chiffres affichés dans le calculateur
- Listes à 3 bullets parfaitement symétriques sans hiérarchie réelle
- Transition : "En conclusion, ce calculateur vous permet de..." en bas de page

### 5. Structure artificielle IA

Marqueurs de prose générée sans fil conducteur réel :
- Titres passe-partout : "Comment calculer X ?", "Pourquoi simuler Y ?", "Qu'est-ce que Z ?"
- Transitions creuses : "En conclusion", "Il est important de noter que", "Dans ce contexte"
- Début de section : "Il convient de", "Dans le cadre de", "En vertu de"
- Symétrie parfaite et artificielle (exactement 3 bullets, exactement 3 sections de même longueur)

### 6. SEO stuffing dans les metadata

Spécifique aux champs `title` et `description` :
- Empilement synonymique : "calculateur simulateur outil"
- Superlatifs sans information : "le meilleur", "complet", "tout-en-un", "en quelques clics"
- Description qui dit "calculez X avec notre outil" sans mentionner ce que X produit comme résultat concret (quel chiffre ? quelle comparaison ?)

Bon exemple (description plus-value immobilière) : "Calculez l'impôt sur votre cession immobilière : IR 19 %, PS 17,2 %, abattements pour durée, surtaxe."
Mauvais exemple : "Simulez facilement votre plus-value immobilière avec notre outil gratuit et complet."

---

## Format de rapport

Pour chaque signal détecté, une entrée structurée :

```
Fichier : src/app/tmi/page.tsx — section "Comment fonctionne le barème progressif ?"
Signal : Structure artificielle IA (titre passe-partout)

Original :
"Comment fonctionne le barème progressif ?"

Problème :
Titre en "Comment X ?" = marqueur IA générique. Il décrit la section au lieu de
l'ancrer dans la situation de l'utilisateur. Le contenu sous ce titre est bon —
c'est le titre seul qui est creux.

Action : reformuler en affirmation ou en question de l'utilisateur
("Le barème progressif ne s'applique pas sur l'ensemble de votre revenu" /
"Pourquoi ma TMI n'est pas mon taux réel ?")
```

---

## Rapport final

Tableau récapitulatif après scan complet :

| Fichier | Signal | Sévérité |
|---------|--------|----------|
| ... | ... | Critique / Gêne / Mineur |

**Critique** : conseillisme ou imprécision fiscale — contredit le positionnement du site
**Gêne** : généricité ou padding — affaiblit la crédibilité
**Mineur** : structure ou SEO — amélioration de confort

Classer par sévérité décroissante. Ne pas signaler plus de 10 passages au total — prioriser.

---

## STOP — attendre validation

Présenter le rapport. **Ne modifier aucun fichier.**

Demander à Nicolas :
- Quels passages corriger maintenant
- Lesquels ignorer (et pourquoi, pour mémoire)

Si des corrections sont validées, les appliquer avec `Edit`, puis :

```bash
npm run type-check
npm run lint
```

Commit : `editorial(anti-slop): suppression contenu générique <périmètre>`
