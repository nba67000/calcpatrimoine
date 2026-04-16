# ✅ Guide de vérification visuelle - CalcPatrimoine redesigné

## 🎯 Checklist visuelle rapide

Ouvre http://localhost:3000 et vérifie ces éléments :

---

## 1️⃣ RenteCalculator (page d'accueil)

### Card formulaire "Calculez votre rente viagère"

**✅ À vérifier** :
- [ ] Fond gris clair (neutral-100, pas blanc)
- [ ] Barre verticale BLEUE MARINE à gauche (border-l-4)
- [ ] Ombre douce visible (shadow-md)
- [ ] Coins arrondis modérés (rounded-lg, PAS rounded-2xl)
- [ ] Titre "Calculez votre rente viagère" en gras
- [ ] Sous-titre gris "Simulation basée sur..."

**❌ Tu ne dois PAS voir** :
- Fond blanc avec border grise fine
- rounded-2xl (coins très arrondis)
- border-2 épais

---

### Bloc résultat (après avoir cliqué "Calculer")

**✅ À vérifier** :
- [ ] Fond blanc (bg-white)
- [ ] Barre horizontale VERTE en haut (border-t-4 vert émeraude)
- [ ] Ombre forte (shadow-lg)
- [ ] Montant en POLICE MONOSPACE (chiffres alignés)
- [ ] Montant TRÈS GRAND (text-6xl, environ 48px)
- [ ] "/ mois" à droite du montant
- [ ] "Rente mensuelle garantie à vie" en petit gris en dessous

**❌ Tu ne dois PAS voir** :
- Gradient bleu (from-blue-50 to-blue-100)
- border-2 bleu
- Montant en police normale
- Animation "scale" (zoom)

**✅ Animation** :
- Le bloc doit apparaître avec un léger mouvement vers le haut (translateY)
- PAS d'effet zoom/scale

---

### Détails (Espérance de vie / Total espéré)

**✅ À vérifier** :
- [ ] 2 blocs gris clair (bg-neutral-50)
- [ ] Coins arrondis légers (rounded-md)
- [ ] Chiffres en gros (text-2xl)
- [ ] Total espéré en POLICE MONOSPACE

**❌ Tu ne dois PAS voir** :
- Fond semi-transparent (bg-white/60)
- Petits chiffres (text-lg)

---

## 2️⃣ InverseCalculator

### Card formulaire

**✅ À vérifier** :
- [ ] Fond gris clair (neutral-100)
- [ ] Barre verticale bleue marine à gauche
- [ ] Ombre douce

### Résultat

**✅ À vérifier** :
- [ ] Fond blanc
- [ ] Barre verte en haut
- [ ] Ombre forte

---

## 3️⃣ CoupleCalculator

### Card formulaire

**✅ À vérifier** :
- [ ] Fond gris clair (neutral-100)
- [ ] Barre verticale VERTE à gauche (border-l-4 success-600)
- [ ] Ombre douce

---

## 🎨 Test couleurs rapide

Ouvre l'inspecteur (F12) et vérifie quelques éléments :

### Card formulaire RenteCalculator
```
Devrait avoir :
- background-color: rgb(241, 245, 249)  // neutral-100
- border-left: 4px solid rgb(46, 74, 111)  // primary-600

Ne devrait PAS avoir :
- background-color: rgb(255, 255, 255)  // white
- border: 1px solid ...
```

### Bloc résultat
```
Devrait avoir :
- background-color: rgb(255, 255, 255)  // white
- border-top: 4px solid rgb(5, 150, 105)  // success-600
- box-shadow: (une ombre visible)

Ne devrait PAS avoir :
- background-image: linear-gradient(...)  // gradient
- border: 2px solid ...
```

### Montant principal
```
Devrait avoir :
- font-family: "Roboto Mono", monospace
- font-size: 3.75rem  // text-6xl
- color: rgb(15, 23, 42)  // neutral-900

Ne devrait PAS avoir :
- font-family: Inter, ...  // font normale
- color: rgb(30, 58, 95)  // bleu
```

---

## 🔍 Détection erreurs courantes

### Problème : "Rien n'a changé"

**Causes possibles** :
1. Cache navigateur → Faire Ctrl+Shift+R (hard refresh)
2. Build pas refait → Relancer `npm run build`
3. Mauvais fichiers → Vérifier que les .tsx ont bien été copiés

**Diagnostic rapide** :
```bash
# Dans src/components/Calculator/RenteCalculator.tsx, chercher :
grep "bg-neutral-100" RenteCalculator.tsx
# Devrait retourner au moins 1 ligne

grep "border-l-4 border-primary-600" RenteCalculator.tsx
# Devrait retourner 1 ligne

grep "font-mono" RenteCalculator.tsx
# Devrait retourner au moins 2 lignes
```

### Problème : "Erreur build tailwind"

**Si erreur `primary-*` not found** :
- Vérifier que `tailwind.config.ts` a bien la nouvelle palette
- Supprimer `.next` et rebuilder
```bash
rm -rf .next
npm run build
```

### Problème : "Fonts pas appliquées"

**Si Roboto Mono ne s'affiche pas** :
1. Vérifier `src/app/layout.tsx` contient les imports fontsource
2. Vérifier dans l'inspecteur que la font est bien chargée
3. Hard refresh (Ctrl+Shift+R)

---

## 📸 Comparaison visuelle

### AVANT (style Lovable)
```
┌─────────────────────────────────────┐
│ Vos informations             [blanc]│ ← Fond blanc
│ ─────────────────────────── [border]│ ← Border grise fine
│                                     │
│  Capital: [100000] €                │ ← Chiffres normaux
│  ═══════════════════ [slider]       │ ← Slider basique
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ [Dégradé bleu vif ↘]                │ ← Gradient bleu
│ ───────────────────────────── [bleu]│ ← Border bleue épaisse
│                                     │
│  Votre rente: 483€          [bleu]  │ ← Texte bleu
│                                     │
└─────────────────────────────────────┘
```

### APRÈS (style CalcPatrimoine)
```
┌─────────────────────────────────────┐
█ Calculez votre rente viagère [gris] │ ← Barre bleue gauche
│ Simulation basée sur INSEE 2022     │ ← Sous-titre
│ ─────────────────────────── [ombre] │ ← Ombre douce
│                                     │
│  Capital: [100 000] € [monospace]   │ ← Espaces + mono
│  ───────────●───────── [curseur]    │ ← Curseur visible
│                                     │
└─────────────────────────────────────┘

══════════════════════════════════════ ← Barre verte top
┌─────────────────────────────────────┐
│ Votre rente viagère estimée  [noir] │ ← Texte noir
│                                     │
│  483€ / mois [TRÈS GROS, monospace] │ ← Police mono
│  Rente mensuelle garantie à vie     │ ← Note grise
│ ─────────────────────────── [ombre] │ ← Ombre forte
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ Validation finale

**Le redesign est réussi si tu observes** :

1. ✅ Plus aucun gradient bleu vif
2. ✅ Cards avec fond gris clair (pas blanc)
3. ✅ Barres colorées verticales/horizontales comme accents
4. ✅ Ombres douces partout (pas de borders épaisses)
5. ✅ Montants en police monospace (chiffres alignés)
6. ✅ Coins arrondis modérés (pas excessifs)
7. ✅ Couleurs sobres (bleu marine, vert émeraude)
8. ✅ Animations douces (pas de zoom)

**Encore du style Lovable si tu vois** :

1. ❌ Gradients bleus vifs
2. ❌ Fond blanc partout avec borders grises
3. ❌ rounded-2xl (coins très arrondis)
4. ❌ border-2 épais
5. ❌ Couleurs bleues saturées
6. ❌ Animation scale/zoom

---

## 🎯 Score visuel cible

**Différenciation Lovable** : 85%+

**Critères** :
- Cards : 100% différent ✅
- Couleurs : 100% différent ✅
- Typographie : 80% différent ✅
- Animations : 90% différent ✅
- Structure : 60% différent (normal)

---

**Si tu vois ces changements → Redesign réussi ! 🎉**
