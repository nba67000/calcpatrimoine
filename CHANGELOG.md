# Changelog

Toutes les modifications notables du projet sont documentées ici.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [1.0.0] - 2026-04-14

### ✨ Ajouté
- **UX améliorée pour réversion** : Carte avec toggle switch au lieu de bouton "+"
- **Réversion dans calculateur inverse** : Option réversion maintenant disponible
- **Documentation complète** : CODE_GUIDE.md avec guide maintenabilité
- **Commentaires JSDoc** : Toutes les fonctions documentées avec exemples

### 🧹 Nettoyé
- Suppression `AdvancedOptions.tsx` (options avancées retirées)
- Suppression `pdfExport.ts` (export PDF retiré)
- Suppression `ADVANCED_FEATURES.md` (documentation obsolète)
- Refactoring complet `mortality.ts` avec commentaires détaillés

### 🔧 Modifié
- **mortality.ts** : Ajout constantes `NEGLIGIBLE_PROBABILITY`, `MAX_COUPLE_YEARS`
- **mortality.ts** : JSDoc complet sur toutes les fonctions
- **mortality.ts** : Amélioration lisibilité avec sections clairement séparées
- **RenteCalculator.tsx** : Carte réversion avec émoji 💑 et toggle switch
- **InverseCalculator.tsx** : Ajout option réversion complète

### 📝 Documentation
- Ajout **CODE_GUIDE.md** : Guide complet développeur
- Ajout **CHANGELOG.md** : Suivi modifications
- Amélioration commentaires inline dans tous les fichiers

---

## [0.9.0] - 2026-04-13

### ✨ Ajouté
- Mode couple avec 7 stratégies comparatives
- Formule actuarielle exacte pour réversion (Esch p.18)
- FAQ complète (15 questions)
- Page méthodologie détaillée
- Cross-links entre pages

### 🔧 Modifié
- Correction bugs inputs (validation onBlur au lieu de onChange)
- Correction sliders transparents (ajout `!important` CSS)

---

## [0.8.0] - 2026-04-12

### ✨ Ajouté
- Calculateur inverse (montant souhaité → capital requis)
- Menu mobile avec hamburger
- Footer avec liens

### 🔧 Modifié
- Amélioration responsive mobile
- Optimisation animations Framer Motion

---

## [0.7.0] - 2026-04-10

### ✨ Ajouté
- Calculateur rente simple
- Option réversion au conjoint
- Tables mortalité INSEE 2022
- Page d'accueil

### 🎨 Design
- Système de design Tailwind
- Animations smooth
- UX professionnelle

---

## [0.1.0] - 2026-04-01

### ✨ Ajouté
- Initialisation projet Next.js 15
- Configuration TypeScript
- Configuration Tailwind CSS
- Structure de base

---

## Types de changements

- `✨ Ajouté` : Nouvelles fonctionnalités
- `🔧 Modifié` : Changements dans fonctionnalités existantes
- `❌ Déprécié` : Fonctionnalités bientôt supprimées
- `🗑️ Supprimé` : Fonctionnalités supprimées
- `🐛 Corrigé` : Corrections de bugs
- `🔐 Sécurité` : Correctifs de vulnérabilités
- `🧹 Nettoyé` : Refactoring et nettoyage code
- `📝 Documentation` : Ajouts/modifications documentation
- `🎨 Design` : Changements visuels/UX

---

**Note** : Les versions suivent le format MAJEUR.MINEUR.CORRECTIF
- MAJEUR : Changements incompatibles API
- MINEUR : Ajout fonctionnalités rétro-compatibles
- CORRECTIF : Corrections bugs rétro-compatibles
