# 🚀 Plan de migration design CalcPatrimoine

## Migration progressive en 3 phases

---

## PHASE 1 : Quick Wins (30 min) ⚡

**Objectif** : Supprimer les marqueurs Lovable les plus visibles

### 1.1 Remplacer Tailwind config

```bash
# Backup ancien config
mv tailwind.config.ts tailwind.config.OLD.ts

# Utiliser nouveau config
mv tailwind.config.NEW.ts tailwind.config.ts

# Installer fonts
npm install @fontsource/inter @fontsource/playfair-display @fontsource/roboto-mono
```

### 1.2 Ajouter fonts dans layout.tsx

```tsx
// src/app/layout.tsx
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/roboto-mono/500.css'
import '@fontsource/roboto-mono/700.css'
```

### 1.3 Recherche/remplacement globale

**Dans tous les fichiers .tsx** :

```bash
# Rounded
rounded-2xl → rounded-lg
rounded-xl → rounded-lg

# Borders
border-2 → shadow-card (ou supprimer si redondant)
border-4 → border-l-4 (ou border-t-4)

# Couleurs
gray-50 → neutral-50
gray-100 → neutral-100
gray-200 → neutral-200
gray-600 → neutral-600
gray-900 → neutral-900

blue-50 → primary-50
blue-100 → primary-100
blue-600 → primary-600
blue-900 → primary-900

green-600 → success-600
amber-600 → warning-600
red-600 → error-600

# Gradients (supprimer)
bg-gradient-to-br from-blue-50 to-blue-100 → bg-white
bg-gradient-to-r from-amber-50 to-orange-50 → bg-warning-50
```

**Résultat attendu** : Look déjà 60% différent !

---

## PHASE 2 : Identité visuelle (1-2h) 🎨

**Objectif** : Implémenter le design CalcPatrimoine

### 2.1 Refonte Cards principales

**Pattern à appliquer partout** :

```tsx
// AVANT (Lovable)
<div className="bg-white rounded-2xl border-2 border-gray-200 p-8">

// APRÈS (CalcPatrimoine)
<div className="bg-neutral-100 rounded-lg shadow-card p-8 border-l-4 border-primary-600">
```

**Fichiers concernés** :
- `src/components/Calculator/RenteCalculator.tsx`
- `src/components/Calculator/InverseCalculator.tsx`
- `src/components/Calculator/CoupleCalculator.tsx`

### 2.2 Refonte Résultats

**Pattern bloc résultat** :

```tsx
// AVANT
<motion.div className="bg-gradient-to-br from-blue-50 to-blue-100 
                       rounded-2xl border-2 border-blue-200 p-8">

// APRÈS
<motion.div className="bg-white rounded-lg shadow-result p-10 
                       border-t-4 border-success-600">
```

### 2.3 Améliorer Inputs

**Pattern input montant** :

```tsx
// AVANT
<input className="w-40 px-3 py-1 text-lg font-medium 
                  border border-gray-300 rounded-lg" />

// APRÈS
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
    <span className="text-neutral-400 font-medium">€</span>
  </div>
  <input className="w-full pl-10 pr-4 py-3.5 
                    bg-white text-right font-mono text-lg font-semibold
                    text-neutral-900
                    border-2 border-neutral-300 rounded-md
                    focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20
                    transition-all duration-200" />
</div>
```

### 2.4 Améliorer Range Sliders

**Pattern curseur premium** :

```tsx
<input
  type="range"
  className="w-full h-1.5 bg-neutral-300 rounded-full appearance-none cursor-pointer
             [&::-webkit-slider-thumb]:appearance-none
             [&::-webkit-slider-thumb]:w-5
             [&::-webkit-slider-thumb]:h-5
             [&::-webkit-slider-thumb]:rounded-full
             [&::-webkit-slider-thumb]:bg-primary-700
             [&::-webkit-slider-thumb]:shadow-md
             [&::-webkit-slider-thumb]:border-2
             [&::-webkit-slider-thumb]:border-white
             [&::-webkit-slider-thumb]:cursor-grab
             [&::-webkit-slider-thumb]:active:cursor-grabbing
             [&::-webkit-slider-thumb]:hover:bg-primary-800
             [&::-webkit-slider-thumb]:transition-colors"
/>
```

### 2.5 Refonte Titres

**Pattern titres sections** :

```tsx
// AVANT
<h2 className="text-xl font-medium mb-6">Vos informations</h2>

// APRÈS
<div className="mb-8">
  <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-2">
    Calculez votre rente viagère
  </h2>
  <p className="text-sm text-neutral-600">
    Simulation basée sur les tables de mortalité INSEE 2022
  </p>
</div>
```

### 2.6 Refonte Montants

**Pattern montants résultats** :

```tsx
// AVANT
<div className="text-5xl font-bold text-blue-900">
  {formatEuro(result.monthly_amount)}
</div>

// APRÈS
<div className="flex items-baseline gap-2">
  <span className="text-6xl font-bold font-mono text-neutral-900 tracking-tight">
    {formatEuro(result.monthly_amount)}
  </span>
  <span className="text-xl text-neutral-600 font-medium">/ mois</span>
</div>
<p className="text-sm text-neutral-500 mt-2">
  Rente mensuelle garantie à vie
</p>
```

---

## PHASE 3 : Polish & Animations (1h) ✨

**Objectif** : Micro-interactions premium

### 3.1 Simplifier animations

**Remplacer partout** :

```tsx
// AVANT
initial={{ scale: 0.8, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ duration: 0.4, type: 'spring' }}

// APRÈS
initial={{ y: 10, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.2 }}
```

### 3.2 Améliorer Boutons

**Pattern bouton primaire** :

```tsx
<button className="bg-primary-700 hover:bg-primary-800 
                   text-white px-8 py-3 rounded-md
                   shadow-md hover:shadow-lg
                   transition-all duration-200
                   font-medium tracking-wide">
  Calculer ma rente
</button>
```

**Pattern bouton secondaire** :

```tsx
<button className="bg-neutral-100 hover:bg-neutral-200
                   text-neutral-700 px-6 py-2.5 rounded-md
                   font-medium transition-colors">
  Comparer
</button>
```

### 3.3 Ajouter icônes contextuelles

**Installer heroicons** :

```bash
npm install @heroicons/react
```

**Exemples d'usage** :

```tsx
import { CheckCircleIcon, InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'

// Résultat positif
<CheckCircleIcon className="w-6 h-6 text-success-600" />

// Info pédagogique
<InformationCircleIcon className="w-5 h-5 text-primary-600" />

// Disclaimer
<ExclamationTriangleIcon className="w-6 h-6 text-error-600" />
```

### 3.4 Améliorer Notes pédagogiques

**Pattern note info** :

```tsx
<div className="p-4 bg-primary-50 rounded-md border-l-4 border-primary-600">
  <div className="flex gap-3">
    <div className="flex-shrink-0 mt-0.5">
      <InformationCircleIcon className="w-5 h-5 text-primary-600" />
    </div>
    <div>
      <p className="text-sm font-medium text-primary-900 mb-1">
        Table de mortalité unisexe
      </p>
      <p className="text-xs text-primary-700 leading-relaxed">
        Depuis décembre 2012...
      </p>
    </div>
  </div>
</div>
```

### 3.5 Améliorer Disclaimers

**Pattern disclaimer** :

```tsx
<div className="bg-error-50 rounded-lg shadow-subtle p-6 
                border-l-4 border-error-600">
  <div className="flex gap-3">
    <div className="flex-shrink-0">
      <ExclamationTriangleIcon className="w-6 h-6 text-error-600" />
    </div>
    <div className="flex-1">
      <h4 className="text-base font-bold text-error-900 mb-3">
        Avertissement Important
      </h4>
      {/* ... contenu ... */}
    </div>
  </div>
</div>
```

---

## PHASE 4 : Header & Footer (30 min) 🎯

### 4.1 Header professionnel

```tsx
// src/components/Header.tsx
<header className="bg-primary-900 border-b border-primary-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo avec accent or */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-accent-500 rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-xl">C</span>
        </div>
        <span className="text-white font-serif font-bold text-xl">
          CalcPatrimoine
        </span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <a href="/" className="text-neutral-300 hover:text-white transition-colors text-sm font-medium">
          Accueil
        </a>
        <a href="/methodologie" className="text-neutral-300 hover:text-white transition-colors text-sm font-medium">
          Méthodologie
        </a>
        <a href="/a-propos" className="text-neutral-300 hover:text-white transition-colors text-sm font-medium">
          À propos
        </a>
      </nav>
    </div>
  </div>
</header>
```

### 4.2 Footer sobre

```tsx
// src/components/Footer.tsx
<footer className="bg-neutral-900 border-t border-neutral-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Colonne 1 : Branding */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-accent-500 rounded-md"></div>
          <span className="text-white font-serif font-bold">CalcPatrimoine</span>
        </div>
        <p className="text-sm text-neutral-400 leading-relaxed">
          Simulateur gratuit de rente viagère basé sur les tables INSEE 2022.
        </p>
      </div>

      {/* Colonne 2 : Navigation */}
      <div>
        <h3 className="text-white font-semibold mb-4">Navigation</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="/" className="text-neutral-400 hover:text-white transition-colors">Accueil</a></li>
          <li><a href="/methodologie" className="text-neutral-400 hover:text-white transition-colors">Méthodologie</a></li>
          <li><a href="/faq" className="text-neutral-400 hover:text-white transition-colors">FAQ</a></li>
        </ul>
      </div>

      {/* Colonne 3 : Légal */}
      <div>
        <h3 className="text-white font-semibold mb-4">Légal</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="/mentions-legales" className="text-neutral-400 hover:text-white transition-colors">Mentions légales</a></li>
          <li><a href="/cgu" className="text-neutral-400 hover:text-white transition-colors">CGU</a></li>
          <li><a href="/politique-confidentialite" className="text-neutral-400 hover:text-white transition-colors">Confidentialité</a></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
      <p className="text-xs text-neutral-500">
        © 2026 CalcPatrimoine. Outil pédagogique gratuit à titre indicatif.
      </p>
    </div>
  </div>
</footer>
```

---

## ✅ Checklist de migration

### Phase 1 (Quick wins)
- [ ] Installer nouveau tailwind.config
- [ ] Installer fonts (Inter, Playfair, Roboto Mono)
- [ ] Remplacer rounded-2xl → rounded-lg
- [ ] Remplacer gray-* → neutral-*
- [ ] Remplacer blue-* → primary-*
- [ ] Supprimer gradients to-br

### Phase 2 (Identité)
- [ ] Refonte cards (bg-neutral-100, border-l-4, shadow-card)
- [ ] Refonte résultats (bg-white, border-t-4, shadow-result)
- [ ] Améliorer inputs (icône €, font-mono, focus ring)
- [ ] Améliorer range sliders (border-white, cursor-grab)
- [ ] Titres en font-serif
- [ ] Montants en font-mono

### Phase 3 (Polish)
- [ ] Simplifier animations (y: 10 au lieu de scale)
- [ ] Installer heroicons
- [ ] Ajouter icônes contextuelles
- [ ] Améliorer notes pédagogiques
- [ ] Refonte disclaimers

### Phase 4 (Header/Footer)
- [ ] Header bg-primary-900
- [ ] Logo accent or
- [ ] Footer bg-neutral-900
- [ ] Navigation sobre

---

## 🎯 Résultat attendu

**Avant (Lovable)** :
- Gradients bleus vifs partout
- Rounded-2xl systématique
- Border-2 épais
- Couleurs saturées
- Animations scale agressives

**Après (CalcPatrimoine)** :
- Tons sobres bleu marine + or
- Rounded-lg maximum
- Ombres douces
- Accents border-l / border-t
- Animations translateY subtiles
- Typographie serif premium
- Montants en monospace

---

**Temps total** : 3-4h pour migration complète
**Impact visuel** : 90% différent de Lovable !
