---
description: Audit éditorial de tout le contenu visible du site. Simplifie les formulations opaques sans altérer l'exactitude des calculs ni travestir la vérité. Référence : la scène du notaire dans Les Trois Frères (Les Inconnus, 1995).
---

# /trois-freres

Tu es un relecteur éditorial dont la mission est d'appliquer le **test des trois frères** à tout le contenu
visible du site CalcPatrimoine.

**Le test :** imagine les frères Latour assis devant l'écran. Si l'un d'eux hausse les épaules, soupire, ou
est sur le point de gifler quelqu'un — la phrase échoue le test. Elle doit être reformulée.

**La règle d'or :** simplifier la formulation, jamais la vérité. Un taux exact reste exact. Une référence
légale reste citée (mais peut être expliquée). Un cas non géré reste signalé honnêtement.

---

## Étapes

### 1. Inventaire des fichiers à analyser

Scanner dans cet ordre :

**Calculateurs — texte visible dans l'UI :**
- `src/components/Calculator/*.tsx` — labels, placeholders, descriptions, warnings, messages d'optimisation
- `src/components/LegalDisclaimer.tsx` et `src/components/AlertList.tsx`

**Pages calculateurs — sections sous le fold :**
- `src/app/*/page.tsx` — sections "Comment ça marche", "Exemples", "Méthodologie", descriptions des limites
- `src/app/assurance-vie/*/page.tsx` — idem

**FAQ :**
- `src/app/faq/*/page.tsx` — toutes les questions et réponses

**Blog :**
- `src/app/blog/*/page.tsx` ou fichiers MDX équivalents

**Homepage :**
- `src/app/page.tsx` — hero, manifeste, descriptions des outils

Ne pas analyser : les commentaires de code, les métadonnées SEO (title/description), les sources légales
dans `docs/sources/`.

---

### 2. Identifier les passages qui échouent le test

Pour chaque fichier, relever les passages qui cumulent un ou plusieurs de ces défauts :

**Défauts de forme :**
- Jargon fiscal non expliqué au premier usage ("assiette", "foyer fiscal", "revenu net global", "plus-value nette imposable")
- Phrase de plus de 30 mots sans respiration
- Accumulation de parenthèses imbriquées `(comme (ceci) qui (confuse))`
- Début de phrase avec "Il convient de noter que", "Dans le cadre de", "En vertu de"
- Nominalisation excessive ("la réalisation de l'opération de calcul" → "calculer")

**Défauts de fond :**
- Une phrase qui dit QUOI mais pas POURQUOI (rendre le "pourquoi" visible)
- Un résultat présenté sans que l'utilisateur sache ce qu'il est censé en faire
- Un avertissement qui fait peur sans expliquer ce que ça change concrètement
- Un exemple chiffré qui n'aide pas à visualiser le cas réel de l'utilisateur

**Ce qui NE doit PAS être signalé :**
- Les références légales (Art. 197 CGI, BOFiP, etc.) — elles restent, on peut les expliquer à côté
- Les termes techniques qui ont une traduction exacte déjà dans la phrase ("TMI", "PFU", etc.)
- Le ton factuel et non-directif — il est intentionnel, ne pas l'adoucir en conseil

---

### 3. Produire le rapport

Pour chaque passage identifié, produire une entrée au format suivant :

```
📍 Fichier : src/app/tmi/page.tsx — section "Comment fonctionne le barème progressif"

❌ Original :
"Chaque tranche s'applique sur la fraction concernée du revenu."

🔍 Problème :
Trop abstrait — "fraction concernée" ne dit rien de concret. L'utilisateur ne sait pas
ce que ça signifie pour ses propres revenus.

✅ Proposé :
"Chaque tranche ne s'applique qu'à la partie de votre revenu qui tombe dans cette
tranche — pas sur l'ensemble. À 50 000 €, vous ne payez pas 30 % sur 50 000 €."

⚖️ Vérification exactitude : inchangée — l'exemple chiffré est correct et déjà présent
deux phrases plus loin dans l'original ; il est remonté pour être immédiatement utile.
```

Chaque entrée doit inclure la ligne `⚖️ Vérification exactitude` qui confirme que la reformulation
ne change ni les chiffres, ni la portée juridique, ni les limites déclarées.

**Ne pas reformuler plus de 5 passages par fichier** — prioriser les plus visibles (hero,
résultats, warnings critiques) sur les sections profondes.

---

### 4. Synthèse

Produire un tableau récapitulatif :

| Fichier | Passages identifiés | Sévérité (⚡ bloque la compréhension / ⚠️ gêne / 💡 amélioration) |
|---|---|---|
| ... | ... | ... |

Classer par sévérité décroissante.

---

### 5. STOP — attendre validation

Présenter le rapport complet. **Ne pas modifier les fichiers.**

Demander à Nicolas :
- Quelles reformulations il accepte telles quelles
- Lesquelles il veut ajuster
- Lesquelles il rejette (avec la raison, pour ne pas les reproposer)

---

### 6. Application

Pour chaque reformulation validée :
- Modifier le fichier source avec `Edit`
- Vérifier que le texte environnant reste cohérent (pas de "comme mentionné ci-dessus" orphelin)
- Ne pas toucher aux imports, à la logique, aux constantes

Après toutes les modifications :
```bash
npm run type-check
npm run lint
```

Commit : `editorial(trois-freres): simplification éditoriale <périmètre>`

---

## Exemples de bon et mauvais usage du test

| Notaire (❌) | Frères Latour (✅) |
|---|---|
| "L'assiette de la plus-value nette imposable est déterminée après application des abattements pour durée de détention." | "Plus vous gardez le bien longtemps, moins vous payez d'impôt à la revente. Chaque année compte." |
| "La décote s'applique automatiquement et réduit l'impôt proportionnellement." | "Si votre impôt est faible, l'État réduit encore un peu la note. C'est automatique, vous n'avez rien à demander." |
| "Il convient de noter que les revenus soumis au taux forfaitaire ne sont pas pris en compte." | "Ce calculateur ne couvre pas les revenus boursiers taxés à taux fixe (dividendes, plus-values de cession de titres)." |
| "Versement déductible du revenu net global dans la limite du plafond pluriannuel." | "Ce que vous versez sur le PER réduit votre revenu imposable — jusqu'à un certain plafond calculé sur vos revenus des 5 dernières années." |

## Ce que ce skill ne fait PAS

- Il ne change pas les chiffres, taux, seuils ou exemples chiffrés
- Il ne supprime pas les références légales (Art. X CGI, BOFiP…) — il peut en ajouter une explication à côté
- Il ne remplace pas "nous calculons" par "nous conseillons" — le positionnement anti-conseil est non négociable
- Il ne rend pas le contenu plus court si la longueur est justifiée par la complexité réelle du sujet
- Il ne touche pas aux commentaires de code ni aux métadonnées SEO
