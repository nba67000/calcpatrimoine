# Script de migration table unisexe - À exécuter manuellement

## ✅ DÉJÀ FAIT

- [x] Fonction `getUnisexMortalityData()` créée
- [x] Fonction `calculateSurvivalProbabilityUnisex()` créée  
- [x] Fonction `calculateLastSurvivorFactorUnisex()` créée
- [x] `calculateSimpleAnnuity()` modifiée (sans gender)
- [x] `calculateAnnuity()` modifiée (sans gender)

## 🔧 À FAIRE MANUELLEMENT

### 1. Modifier `calculateReversionAnnuity()` (ligne ~389)

**Changer signature de** :
```typescript
export function calculateReversionAnnuity(
  capital: number,
  age: number,
  gender: Gender,      // ⚠️ SUPPRIMER
  spouseAge: number,
  reversionPercentage: 60 | 80 | 100
)
```

**En** :
```typescript
export function calculateReversionAnnuity(
  capital: number,
  age: number,
  spouseAge: number,   // ⚠️ gender supprimé
  reversionPercentage: 60 | 80 | 100
)
```

**Dans le corps de la fonction, remplacer** :
```typescript
const mainData = getMortalityData(age, gender)
const spouseGender: Gender = gender === 'homme' ? 'femme' : 'homme'
const spouseData = getMortalityData(spouseAge, spouseGender)

// ...

const lastSurvivorFactor = calculateLastSurvivorFactor(
  age,
  gender,
  spouseAge,
  spouseGender,
  techRate
)
```

**Par** :
```typescript
const mainData = getUnisexMortalityData(age)
const spouseData = getUnisexMortalityData(spouseAge)

// ...

const lastSurvivorFactor = calculateLastSurvivorFactorUnisex(
  age,
  spouseAge,
  techRate
)
```

---

### 2. Modifier `calculateRequiredCapital()` (ligne ~500)

**Changer signature de** :
```typescript
export function calculateRequiredCapital(
  desiredMonthlyAmount: number,
  age: number,
  gender: Gender,      // ⚠️ SUPPRIMER
  reversion?: {
    spouse_age: number
    percentage: 60 | 80 | 100
  }
)
```

**En** :
```typescript
export function calculateRequiredCapital(
  desiredMonthlyAmount: number,
  age: number,
  reversion?: {
    spouse_age: number
    percentage: 60 | 80 | 100
  }
)
```

**Dans le corps, remplacer** :
```typescript
const data = getMortalityData(age, gender)
```

**Par** :
```typescript
const data = getUnisexMortalityData(age)
```

**Et plus bas** :
```typescript
const spouseData = getMortalityData(reversion.spouse_age, ...)
const lastSurvivorFactor = calculateLastSurvivorFactor(age, gender, reversion.spouse_age, ...)
```

**Par** :
```typescript
const spouseData = getUnisexMortalityData(reversion.spouse_age)
const lastSurvivorFactor = calculateLastSurvivorFactorUnisex(age, reversion.spouse_age, techRate)
```

---

### 3. Modifier `calculateCoupleStrategies()` (ligne ~600)

**Changer signature de** :
```typescript
export function calculateCoupleStrategies(input: CoupleProfile)
```

Le CoupleProfile sera modifié dans types, donc rien à changer ici pour la signature.

**Dans le corps, remplacer** :
```typescript
const data1 = getMortalityData(age1, input.person1_gender)
const data2 = getMortalityData(age2, input.person2_gender)
```

**Par** :
```typescript
const data1 = getUnisexMortalityData(age1)
const data2 = getUnisexMortalityData(age2)
```

**Et tous les appels à** :
```typescript
calculateLastSurvivorFactor(age1, gender1, age2, gender2, techRate)
```

**Par** :
```typescript
calculateLastSurvivorFactorUnisex(age1, age2, techRate)
```

---

## 🎯 TYPES À MODIFIER (src/types/index.ts)

### Modifier `CalculatorInput`

**Avant** :
```typescript
export interface CalculatorInput {
  age: number
  capital: number
  gender: Gender        // ⚠️ SUPPRIMER
  reversion?: {
    enabled: boolean
    spouse_age?: number
    percentage?: 60 | 80 | 100
  }
}
```

**Après** :
```typescript
export interface CalculatorInput {
  age: number
  capital: number
  reversion?: {
    enabled: boolean
    spouse_age?: number
    percentage?: 60 | 80 | 100
  }
}
```

### Modifier `CoupleProfile`

**Avant** :
```typescript
export interface CoupleProfile {
  person1_age: number
  person1_gender: Gender    // ⚠️ SUPPRIMER
  person2_age: number
  person2_gender: Gender    // ⚠️ SUPPRIMER
  total_capital: number
}
```

**Après** :
```typescript
export interface CoupleProfile {
  person1_age: number
  person2_age: number
  total_capital: number
}
```

**Note** : Le type `Gender` reste défini (utilisé par tables JSON internes), mais plus dans les inputs utilisateur.

---

## 🎨 UI À MODIFIER

### RenteCalculator.tsx

**Supprimer** :
```typescript
const [gender, setGender] = useState<Gender>('homme')
```

**Supprimer** le toggle Homme/Femme de l'UI

**Ajouter** note pédagogique :
```tsx
<div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
  <p className="text-sm text-blue-900">
    <strong>ℹ️ Table de mortalité unisexe (réglementation 2012)</strong><br />
    Depuis décembre 2012, les assureurs utilisent une table unique pour
    hommes et femmes (moyenne pondérée). Ce calculateur applique cette
    réglementation obligatoire.
  </p>
  <p className="text-xs text-blue-700 mt-2">
    Biologiquement, les femmes vivent ~4 ans de plus que les hommes
    (espérance vie 24,1 vs 20,4 ans à 65 ans), mais la loi impose
    un tarif identique depuis l'arrêt CJUE de mars 2011.
  </p>
</div>
```

**Modifier** useEffect :
```typescript
useEffect(() => {
  const input: CalculatorInput = {
    age,
    capital,
    // ⚠️ SUPPRIMER : gender,
    reversion: showReversion ? { ... } : { enabled: false }
  }
  
  const result = calculateAnnuity(input)
  setResult(result)
}, [age, capital, showReversion, spouseAge, reversionPercentage])
// ⚠️ Retirer gender des dépendances
```

### InverseCalculator.tsx

Mêmes modifications que RenteCalculator.

### CoupleCalculator.tsx

**Supprimer** :
```typescript
const [person1Gender, setPerson1Gender] = useState<Gender>('homme')
const [person2Gender, setPerson2Gender] = useState<Gender>('femme')
```

**Supprimer** les toggles Homme/Femme

**Modifier** appel :
```typescript
const profile: CoupleProfile = {
  person1_age: person1Age,
  person2_age: person2Age,
  // ⚠️ SUPPRIMER : person1_gender, person2_gender
  total_capital: totalCapital
}
```

---

## ✅ CHECKLIST FINALE

Après toutes ces modifications :

- [ ] `mortality.ts` : Toutes fonctions unisexes
- [ ] `types/index.ts` : CalculatorInput et CoupleProfile sans gender
- [ ] `RenteCalculator.tsx` : Sans toggle, avec note pédagogique
- [ ] `InverseCalculator.tsx` : Sans toggle, avec note pédagogique  
- [ ] `CoupleCalculator.tsx` : Sans toggles
- [ ] Tests : Vérifier 100k€ à 65 ans = ~580€/mois
- [ ] Build : `npm run build` sans erreur TypeScript
- [ ] Article blog : Cohérent avec calculateur

---

## 🧪 TESTS RAPIDES

```bash
# Après modifications, tester :

# Test 1
Capital : 100 000€
Âge : 65 ans
Résultat attendu : ~580€/mois (ni 614€ H, ni 551€ F)

# Test 2  
Capital : 100 000€
Âge : 70 ans
Résultat attendu : ~680€/mois

# Test 3 (réversion)
Capital : 100 000€
Âge : 65 ans
Conjoint : 63 ans
Réversion : 80%
Résultat attendu : ~410€/mois
```

---

**Temps estimé modifications** : 1-2h
**Fichiers à modifier** : 5 fichiers
**Lignes modifiées** : ~50 lignes total
