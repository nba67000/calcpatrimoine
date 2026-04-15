# 🎨 CalcPatrimoine - Nouvelle identité visuelle

## Différenciation vs Lovable

### ❌ Style Lovable (à éviter)
- Gradients bleus vifs (bg-gradient-to-br from-blue-50 to-blue-100)
- Rounded-2xl partout
- Border-2 systématique
- Couleurs saturées
- Animations scale/opacity trop présentes

### ✅ Style CalcPatrimoine (nouveau)
- Tons sobres et professionnels
- Angles subtils (rounded-lg max)
- Ombres douces au lieu de borders épais
- Couleurs désaturées
- Animations subtiles (translateY uniquement)

---

## 🎨 Palette de couleurs

### Couleurs principales

**Bleu marine profond** (confiance, stabilité)
```css
primary-900: #0A2540  /* Titres, éléments forts */
primary-800: #1E3A5F  /* Texte important */
primary-700: #2E4A6F  /* Accents */
primary-600: #3E5A7F  /* Interactif */
```

**Or/Bronze** (premium, valeur)
```css
accent-500: #B8860B  /* DarkGoldenRod - Accents premium */
accent-400: #D4AF37  /* Or discret - Hover états */
accent-300: #E5C77F  /* Or clair - Backgrounds subtils */
```

**Gris sophistiqué** (neutralité professionnelle)
```css
neutral-50: #F8FAFC   /* Background principal */
neutral-100: #F1F5F9  /* Cards background */
neutral-200: #E2E8F0  /* Borders subtiles */
neutral-600: #475569  /* Texte secondaire */
neutral-700: #334155  /* Texte principal */
neutral-900: #0F172A  /* Headings */
```

**Sémantique** (résultats)
```css
success-50: #F0FDF4   /* Background vert clair */
success-600: #059669  /* Vert émeraude (résultats positifs) */
success-700: #047857  /* Vert foncé */

warning-50: #FFFBEB   /* Background amber */
warning-600: #D97706  /* Amber (alertes) */

error-50: #FEF2F2    /* Background rouge clair */
error-600: #DC2626   /* Rouge (disclaimers) */
```

---

## 📐 Système de design

### Espacements
```css
xs: 0.5rem (8px)   - Gaps entre icône et texte
sm: 0.75rem (12px) - Padding petits boutons
md: 1rem (16px)    - Padding standard
lg: 1.5rem (24px)  - Padding cards
xl: 2rem (32px)    - Marges sections
2xl: 3rem (48px)   - Espaces entre blocs majeurs
```

### Bordures (angles subtils)
```css
rounded-sm: 0.125rem (2px)  - Inputs
rounded: 0.25rem (4px)      - Petits éléments
rounded-md: 0.375rem (6px)  - Boutons
rounded-lg: 0.5rem (8px)    - Cards (MAX)
```

**❌ JAMAIS** : rounded-xl, rounded-2xl (trop Lovable)

### Ombres (douces et subtiles)
```css
shadow-sm: 0 1px 2px rgba(0,0,0,0.05)          - Hover états
shadow: 0 1px 3px rgba(0,0,0,0.1)              - Cards normales
shadow-md: 0 4px 6px rgba(0,0,0,0.07)          - Cards actives
shadow-lg: 0 10px 15px rgba(0,0,0,0.1)         - Résultats
```

**❌ JAMAIS** : Borders épais (border-2, border-4)

### Typographie

**Famille**
```css
Titres (H1, H2): 'Playfair Display', serif  - Élégant, authorité
Corps: 'Inter', sans-serif                  - Lisible, moderne
Chiffres: 'Roboto Mono', monospace          - Montants financiers
```

**Tailles**
```css
H1 (Hero): text-4xl (36px) font-bold
H2 (Section): text-2xl (24px) font-semibold
H3 (Card title): text-xl (20px) font-medium
Body: text-base (16px)
Small: text-sm (14px)
Tiny: text-xs (12px)
Montants: text-5xl (48px) font-bold tracking-tight
```

---

## 🎨 Composants redesignés

### Card (base)
```css
Avant (Lovable):
bg-white rounded-2xl border-2 border-gray-200 p-8

Après (CalcPatrimoine):
bg-neutral-100 rounded-lg shadow-md p-8 
border-l-4 border-primary-600  /* Accent subtil gauche */
```

### Résultat principal
```css
Avant:
bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200

Après:
bg-white rounded-lg shadow-lg p-10
border-t-4 border-success-600  /* Accent top */
```

### Input montant
```css
Avant:
border border-gray-300 rounded-lg

Après:
bg-white border-2 border-neutral-300 rounded-md
focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20
font-mono  /* Chiffres monospaced */
```

### Range slider
```css
Avant:
bg-gray-200 [&::-webkit-slider-thumb]:bg-blue-600

Après:
bg-neutral-300 h-1.5  /* Plus fin, discret */
[&::-webkit-slider-thumb]:bg-primary-700
[&::-webkit-slider-thumb]:shadow-md
[&::-webkit-slider-thumb]:border-2 border-white  /* Effet 3D */
```

### Boutons
```css
Primaire:
bg-primary-700 hover:bg-primary-800 
text-white px-8 py-3 rounded-md
shadow-md hover:shadow-lg
transition-all duration-200
font-medium tracking-wide

Secondaire:
bg-neutral-200 hover:bg-neutral-300
text-neutral-900 px-6 py-2.5 rounded-md
```

### Disclaimer
```css
Avant:
bg-red-50 border-2 border-red-200

Après:
bg-error-50 rounded-lg shadow-sm p-6
border-l-4 border-error-600  /* Accent gauche */
```

---

## 🎯 Animations (subtiles)

### ❌ Éviter (trop Lovable)
```css
initial={{ scale: 0.8, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
```

### ✅ Préférer (professionnel)
```css
initial={{ y: 10, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.2 }}  /* Rapide et discret */
```

---

## 📊 Exemples visuels

### Layout global
```
[Header: bg-primary-900, texte blanc, logo or]
  └─ Navigation discrète

[Hero section: bg-gradient-subtil primary-900 → primary-800]
  └─ Titre serif blanc
  └─ Sous-titre gris-clair

[Cards calculateurs: bg-neutral-100, shadow-md, accent gauche]
  └─ Inputs: bg-white, border subtile
  └─ Range: fin et discret
  └─ Résultat: bg-white, shadow-lg, accent top

[Footer: bg-neutral-900, texte neutral-400]
```

---

## 🚀 Migration progressive

### Phase 1 (Quick wins)
- Remplacer rounded-2xl → rounded-lg
- Supprimer gradients to-br
- Remplacer border-2 → shadow-md
- Changer couleurs bleu vif → bleu marine

### Phase 2 (Identité)
- Ajouter Playfair Display pour titres
- Ajouter accents or sur éléments premium
- Implémenter border-l-4 sur cards
- Simplifier animations

### Phase 3 (Polish)
- Typographie monospace pour montants
- Espaces respirants (2xl entre sections)
- Micro-interactions hover subtiles
- Dark mode optionnel (primary-900 base)

---

## 💡 Inspiration références

**Sites à analyser** :
- https://www.swisslife.fr (élégance sobre)
- https://www.generali.fr (confiance bancaire)
- https://stripe.com (modernité épurée)
- https://www.axa.fr (professionnalisme)

**À éviter** :
- Gradients multicolores
- Rounded excessifs
- Borders épais partout
- Animations agressives

---

**Cette identité différencie CalcPatrimoine tout en restant professionnelle et rassurante pour la cible seniors/patrimoine.**
