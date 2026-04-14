# 📚 Guide de Maintenabilité - CalcPatrimoine

## 🎯 Vue d'ensemble

CalcPatrimoine est une application Next.js pour calculer des rentes viagères basées sur les tables de mortalité INSEE/INED 2022.

**Stack technique** :
- Next.js 15 (App Router)
- TypeScript 5
- Tailwind CSS
- Framer Motion (animations)
- Recharts (graphiques)

---

## 📂 Structure du projet

```
calcpatrimoine/
├── public/
│   └── mortality_tables.json      # Tables INSEE (NE PAS MODIFIER)
├── src/
│   ├── app/                        # Pages Next.js
│   │   ├── page.tsx               # Page d'accueil (3 calculateurs)
│   │   ├── faq/                   # Page FAQ
│   │   ├── methodologie/          # Page méthodologie
│   │   └── a-propos/              # Page à propos
│   ├── components/
│   │   ├── Calculator/            # 3 calculateurs principaux
│   │   │   ├── RenteCalculator.tsx       # Mode classique
│   │   │   ├── InverseCalculator.tsx     # Montant souhaité
│   │   │   └── CoupleCalculator.tsx      # Mode couple
│   │   ├── Header.tsx             # Menu navigation
│   │   ├── Footer.tsx             # Pied de page
│   │   ├── CrossLink.tsx          # Liens entre pages
│   │   └── TrustMarkers.tsx       # Badges confiance
│   ├── lib/
│   │   ├── mortality.ts           # ⭐ CŒUR MÉTIER (formules)
│   │   └── constants.ts           # Constantes globales
│   └── types/
│       └── index.ts               # Types TypeScript
├── scripts/
│   └── fetch-insee-data.py        # MAJ tables INSEE
└── package.json
```

---

## 🔧 Fichiers clés à connaître

### 1️⃣ `src/lib/mortality.ts` ⭐

**Rôle** : Toute la logique métier des calculs actuariels

**Fonctions principales** :
- `calculateSimpleAnnuity()` - Rente simple sans réversion
- `calculateReversionAnnuity()` - Rente avec réversion au conjoint
- `calculateRequiredCapital()` - Calcul inverse (capital requis)
- `calculateCoupleStrategies()` - Comparaison 7 stratégies couple

**Formules utilisées** :
```typescript
// Rente simple
R = C / a(x)

// Rente avec réversion
R = C / [a(x) + p·a̅_xy]

// Capital requis (inverse)
C = R · a(x)
```

**⚠️ IMPORTANT** :
- Ne jamais modifier les formules sans référence actuarielle
- Toujours tester avec exemples connus avant commit
- Référence : Louis Esch, "Calcul actuariel", Chapitre 3, p.18

### 2️⃣ `src/types/index.ts`

**Rôle** : Définitions TypeScript de toutes les interfaces

**Types critiques** :
- `CalculatorInput` - Input calculateur (âge, capital, réversion)
- `AnnuityResult` - Résultat rente (montants, espérance vie)
- `InverseResult` - Résultat calcul inverse
- `CoupleCalculation` - Résultats comparaison couple

**Convention** :
- Montants TOUJOURS en euros entiers
- Âges entre 50-110 ans
- Réversion : 60, 80 ou 100% uniquement

### 3️⃣ `public/mortality_tables.json`

**Rôle** : Tables de mortalité INSEE/INED 2022

**Structure** :
```json
{
  "metadata": {
    "source": "INSEE/INED",
    "year": 2022,
    "tech_rate": 0.005,
    "last_updated": "2024-01-15"
  },
  "tables": {
    "homme": [ { "age": 50, "annuity_factor": 21.34, ... }, ... ],
    "femme": [ { "age": 50, "annuity_factor": 24.12, ... }, ... ]
  }
}
```

**⚠️ NE JAMAIS MODIFIER MANUELLEMENT**

Mise à jour : `python scripts/fetch-insee-data.py`

---

## 🧪 Tests et validation

### Tests manuels à faire avant chaque deploy

```bash
npm run dev
```

**Scénarios de test** :

#### Test 1 : Rente simple
```
Input:
- Capital : 100 000€
- Âge : 65 ans
- Sexe : Homme

Résultat attendu :
- Rente mensuelle : ~614€/mois
- Espérance de vie : 20.4 ans
- Total espéré : ~150 000€
```

#### Test 2 : Rente avec réversion
```
Input:
- Capital : 100 000€
- Homme 65 ans + Femme 63 ans
- Réversion : 80%

Résultat attendu :
- Rente couple : ~410€/mois
- Rente conjoint après décès : ~328€/mois
```

#### Test 3 : Calcul inverse
```
Input:
- Rente souhaitée : 1 000€/mois
- Âge : 65 ans
- Sexe : Homme

Résultat attendu :
- Capital requis : ~196 000€
```

#### Test 4 : Mode couple
```
Input:
- P1 : H65, 100k€
- P2 : F63, 80k€

Résultat attendu :
- Tableau 7 stratégies visible
- Pas de crash
- Montants cohérents
```

### Validation formules

Utiliser le fichier `test_reversion.js` :

```bash
node test_reversion.js
```

Vérifie que les formules donnent les bons résultats.

---

## 🐛 Débogage courant

### Problème : Rente = 0€ ou NaN

**Cause probable** : Âge hors limites (< 50 ou > 110)

**Solution** :
```typescript
// Vérifier dans le composant
if (age < 50 || age > 110) {
  console.error('Âge hors limites')
  return null
}
```

### Problème : Réversion ne fonctionne pas

**Cause probable** : Réversion activée mais spouse_age manquant

**Solution** :
```typescript
// Dans CalculatorInput
reversion: {
  enabled: true,
  spouse_age: 63,  // ⚠️ REQUIS si enabled = true
  percentage: 80   // ⚠️ REQUIS si enabled = true
}
```

### Problème : Build échoue avec erreur TypeScript

**Cause probable** : Type manquant ou incompatible

**Solution** :
```bash
# Vérifier les types
npm run type-check

# Rebuild
rm -rf .next
npm run build
```

---

## 🔄 Processus de mise à jour

### MAJ tables INSEE (annuelle)

```bash
# 1. Vérifier nouvelle version INSEE disponible
# https://www.ined.fr/fr/tout-savoir-population/chiffres/france/mortalite-cause-deces/tables-mortalite/

# 2. Lancer script Python
cd scripts
python fetch-insee-data.py

# 3. Vérifier JSON généré
cat ../public/mortality_tables.json | jq '.metadata'

# 4. Tester calculateurs
npm run dev

# 5. Commit si OK
git add public/mortality_tables.json
git commit -m "chore: update INSEE mortality tables 2025"
```

### Ajouter nouveau pourcentage réversion (ex: 90%)

**Étape 1** : Modifier type

```typescript
// src/types/index.ts
export interface CalculatorInput {
  reversion?: {
    percentage?: 60 | 80 | 90 | 100  // Ajouter 90
  }
}
```

**Étape 2** : Ajouter bouton UI

```typescript
// RenteCalculator.tsx
<div className="grid grid-cols-4 gap-3">  {/* 3 → 4 */}
  {([60, 80, 90, 100] as const).map((pct) => (
    <button ...>{pct}%</button>
  ))}
</div>
```

**Étape 3** : Tester et commit

```bash
npm run type-check
npm run build
git commit -m "feat: add 90% reversion option"
```

---

## 📝 Conventions de code

### Nommage

```typescript
// Variables : camelCase
const monthlyAmount = 1000

// Constantes : SCREAMING_SNAKE_CASE
const MAX_AGE = 110

// Fonctions : camelCase descriptif
function calculateSimpleAnnuity() {}

// Types : PascalCase
interface AnnuityResult {}

// Composants React : PascalCase
function RenteCalculator() {}
```

### Commentaires

```typescript
/**
 * Description fonction (JSDoc)
 * 
 * @param age - Description paramètre
 * @returns Description retour
 * 
 * @example
 * const result = myFunction(65)
 */
function myFunction(age: number) {
  // Commentaire inline pour logique complexe
  const factor = calculateFactor() // Commentaire fin de ligne
}
```

### Gestion erreurs

```typescript
// ✅ BON
const data = getData()
if (!data) {
  console.error('Erreur descriptive')
  return null
}

// ❌ MAUVAIS
const data = getData()
// Pas de vérification → crash si null
```

---

## 🚀 Déploiement

### Build local

```bash
npm run build
npm start  # Test build en local
```

### Déploiement Vercel

```bash
git push origin main
# Auto-deploy Vercel
```

**Variables d'environnement** (si ajout analytics) :

```bash
# .env.local
NEXT_PUBLIC_UMAMI_WEBSITE_ID=xxx
NEXT_PUBLIC_UMAMI_SRC=https://...
```

---

## 📊 Performance

### Métriques cibles

- **Lighthouse Score** : > 90
- **FCP** (First Contentful Paint) : < 1.5s
- **TTI** (Time to Interactive) : < 3s
- **Bundle size** : < 200KB

### Optimisations appliquées

- ✅ Dynamic imports pour calculateurs
- ✅ Images optimisées (SVG)
- ✅ CSS minimal (Tailwind JIT)
- ✅ Pas de dépendances lourdes

---

## 🔐 Sécurité

### Pas de données sensibles

- ❌ Pas de collecte email/téléphone (lead gen désactivé)
- ❌ Pas de cookies tracking
- ✅ Calculs 100% client-side
- ✅ Pas d'API backend

### Analytics (opt-in)

Si Umami activé :
- Pas de cookies
- Anonyme par défaut
- RGPD compliant

---

## 📞 Contact & Support

**Mainteneur** : Nicolas Barbier

**En cas de bug** :
1. Vérifier console navigateur (F12)
2. Tester scénarios ci-dessus
3. Vérifier tables INSEE à jour
4. Créer issue GitHub si besoin

**Ressources utiles** :
- [Tables INSEE](https://www.insee.fr/fr/statistiques)
- [Formules actuarielles](https://www.actuaries.org)
- [Next.js Docs](https://nextjs.org/docs)

---

**Version** : 1.0.0  
**Dernière mise à jour** : 14 avril 2026
