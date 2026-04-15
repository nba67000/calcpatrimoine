# Migration vers Table Unisexe - Conformité 2012

## 🎯 Objectif

Supprimer le choix "Homme/Femme" et utiliser uniquement une table unisexe conforme à la réglementation du 21 décembre 2012 (arrêt CJUE mars 2011).

---

## ✅ Modifications déjà faites

### 1. Fonction `getUnisexMortalityData()` créée

```typescript
// src/lib/mortality.ts (ligne ~166)

export function getUnisexMortalityData(age: number): MortalityData | null {
  const dataHomme = getMortalityData(age, 'homme')
  const dataFemme = getMortalityData(age, 'femme')
  
  if (!dataHomme || !dataFemme) {
    return null
  }
  
  // Pondération démographique France 2022 (source INSEE)
  const WEIGHT_HOMME = 0.48
  const WEIGHT_FEMME = 0.52
  
  return {
    age,
    mortality_rate: (dataHomme.mortality_rate * WEIGHT_HOMME) + (dataFemme.mortality_rate * WEIGHT_FEMME),
    annuity_factor: (dataHomme.annuity_factor * WEIGHT_HOMME) + (dataFemme.annuity_factor * WEIGHT_FEMME),
    life_expectancy: (dataHomme.life_expectancy * WEIGHT_HOMME) + (dataFemme.life_expectancy * WEIGHT_FEMME)
  }
}
```

### 2. `calculateSimpleAnnuity()` simplifiée

Signature changée de :
```typescript
calculateSimpleAnnuity(capital: number, age: number, gender: Gender)
```

À :
```typescript
calculateSimpleAnnuity(capital: number, age: number)
```

### 3. `calculateAnnuity()` mise à jour

Appels sans `gender`.

---

## 🔧 Modifications à faire

### 1. Créer `calculateLastSurvivorFactorUnisex()`

```typescript
// src/lib/mortality.ts - Après calculateLastSurvivorFactor()

/**
 * Calcule le facteur viager "dernier décès" pour un couple (version unisexe)
 * 
 * @param age1 - Âge personne 1
 * @param age2 - Âge personne 2  
 * @param techRate - Taux technique
 * @returns Facteur viager dernier décès
 */
function calculateLastSurvivorFactorUnisex(
  age1: number,
  age2: number,
  techRate: number
): number {
  let factor = 0
  const discountRate = 1 / (1 + techRate)
  
  for (let t = 1; t <= MAX_COUPLE_YEARS; t++) {
    // Probabilité que personne 1 soit vivante à t
    const prob1 = calculateSurvivalProbabilityUnisex(age1, t)
    
    // Probabilité que personne 2 soit vivante à t
    const prob2 = calculateSurvivalProbabilityUnisex(age2, t)
    
    // Probabilité qu'au moins un soit vivant
    const probAtLeastOne = prob1 + prob2 - (prob1 * prob2)
    
    if (probAtLeastOne < NEGLIGIBLE_PROBABILITY) {
      break
    }
    
    factor += probAtLeastOne * Math.pow(discountRate, t)
  }
  
  return factor
}

/**
 * Version unisexe de calculateSurvivalProbability
 */
function calculateSurvivalProbabilityUnisex(
  age: number,
  years: number
): number {
  let survivalProb = 1.0
  
  for (let k = 0; k < years; k++) {
    const data = getUnisexMortalityData(age + k)
    
    if (!data) {
      break
    }
    
    const annualSurvivalRate = 1 - data.mortality_rate
    survivalProb *= annualSurvivalRate
  }
  
  return survivalProb
}
```

### 2. Mettre à jour `calculateReversionAnnuity()`

```typescript
// src/lib/mortality.ts

export function calculateReversionAnnuity(
  capital: number,
  age: number,
  spouseAge: number,  // ⚠️ Suppression gender
  reversionPercentage: 60 | 80 | 100
): AnnuityResult | null {
  const mainData = getUnisexMortalityData(age)
  const spouseData = getUnisexMortalityData(spouseAge)
  
  if (!mainData || !spouseData) {
    console.error('Données unisexe manquantes')
    return null
  }
  
  const techRate = mortalityTables.metadata.tech_rate
  const reversionRate = reversionPercentage / 100
  
  // Utiliser version unisexe
  const lastSurvivorFactor = calculateLastSurvivorFactorUnisex(
    age,
    spouseAge,
    techRate
  )
  
  const jointFactor = mainData.annuity_factor + (reversionRate * lastSurvivorFactor)
  const annualAmount = capital / jointFactor
  const monthlyAmount = annualAmount / 12
  const spouseMonthlyAmount = monthlyAmount * reversionRate
  
  const jointLifeExpectancy = Math.max(
    mainData.life_expectancy,
    spouseData.life_expectancy
  )
  
  return {
    monthly_amount: Math.round(monthlyAmount),
    annual_amount: Math.round(annualAmount),
    life_expectancy: mainData.life_expectancy,
    total_expected_payout: Math.round(annualAmount * jointLifeExpectancy),
    roi_years: Math.round((capital / annualAmount) * 10) / 10,
    with_reversion: {
      monthly_amount: Math.round(monthlyAmount),
      spouse_monthly_amount: Math.round(spouseMonthlyAmount),
      joint_life_expectancy: jointLifeExpectancy
    },
    annuity_factor: jointFactor,
    tech_rate: techRate
  }
}
```

### 3. Mettre à jour `calculateRequiredCapital()`

```typescript
// src/lib/mortality.ts

export function calculateRequiredCapital(
  desiredMonthlyAmount: number,
  age: number,
  // ⚠️ Suppression gender
  reversion?: {
    spouse_age: number
    percentage: 60 | 80 | 100
  }
): InverseResult | null {
  const data = getUnisexMortalityData(age)  // ⚠️ Changé
  
  if (!data) {
    console.error(`Pas de données unisexe pour ${age} ans`)
    return null
  }
  
  const desiredAnnualAmount = desiredMonthlyAmount * 12
  
  // Sans réversion
  if (!reversion) {
    const requiredCapital = desiredAnnualAmount * data.annuity_factor
    
    return {
      required_capital: Math.round(requiredCapital),
      monthly_amount: desiredMonthlyAmount,
      annual_amount: Math.round(desiredAnnualAmount),
      life_expectancy: data.life_expectancy,
      total_payout: Math.round(desiredAnnualAmount * data.life_expectancy)
    }
  }
  
  // Avec réversion
  const spouseData = getUnisexMortalityData(reversion.spouse_age)  // ⚠️ Changé
  
  if (!spouseData) {
    console.error(`Pas de données unisexe pour ${reversion.spouse_age} ans`)
    return null
  }
  
  const techRate = mortalityTables.metadata.tech_rate
  const reversionRate = reversion.percentage / 100
  
  const lastSurvivorFactor = calculateLastSurvivorFactorUnisex(  // ⚠️ Changé
    age,
    reversion.spouse_age,
    techRate
  )
  
  const jointFactor = data.annuity_factor + (reversionRate * lastSurvivorFactor)
  const requiredCapital = desiredAnnualAmount * jointFactor
  
  const jointLifeExpectancy = Math.max(
    data.life_expectancy,
    spouseData.life_expectancy
  )
  
  return {
    required_capital: Math.round(requiredCapital),
    monthly_amount: desiredMonthlyAmount,
    annual_amount: Math.round(desiredAnnualAmount),
    life_expectancy: data.life_expectancy,
    total_payout: Math.round(desiredAnnualAmount * jointLifeExpectancy)
  }
}
```

### 4. Mettre à jour `calculateCoupleStrategies()`

```typescript
// src/lib/mortality.ts

export function calculateCoupleStrategies(input: CoupleProfile): CoupleCalculation[] {
  const age1 = input.person1_age
  const age2 = input.person2_age
  const capital = input.total_capital
  
  // ⚠️ Plus besoin de person1_gender / person2_gender
  
  const data1 = getUnisexMortalityData(age1)  // ⚠️ Changé
  const data2 = getUnisexMortalityData(age2)  // ⚠️ Changé
  
  if (!data1 || !data2) {
    console.error('Données unisexe manquantes pour le couple')
    return []
  }
  
  const techRate = mortalityTables.metadata.tech_rate
  
  // Stratégie 1 : Personne 1 seule
  const strategy1 = {
    strategy: 'Personne 1 seule',
    monthly_amount: Math.round(capital / data1.annuity_factor / 12),
    description: `Rente viagère pour personne 1 uniquement`
  }
  
  // Stratégie 2 : Personne 2 seule
  const strategy2 = {
    strategy: 'Personne 2 seule',
    monthly_amount: Math.round(capital / data2.annuity_factor / 12),
    description: `Rente viagère pour personne 2 uniquement`
  }
  
  // Stratégie 3 : Dernier décès (tant qu'un vivant)
  const lastSurvivorFactor = calculateLastSurvivorFactorUnisex(  // ⚠️ Changé
    age1,
    age2,
    techRate
  )
  
  const strategy3 = {
    strategy: 'Dernier décès',
    monthly_amount: Math.round(capital / lastSurvivorFactor / 12),
    description: `Rente versée tant qu'au moins un est vivant`
  }
  
  // Stratégies 4-7 : Réversion 60%, 80%, 100% dans les deux sens
  // ... (similaire mais sans gender)
  
  return [strategy1, strategy2, strategy3 /* ... */]
}
```

### 5. Mettre à jour types `src/types/index.ts`

```typescript
// src/types/index.ts

export interface CalculatorInput {
  age: number
  capital: number
  // ⚠️ Suppression gender: Gender
  reversion?: {
    enabled: boolean
    spouse_age?: number
    percentage?: 60 | 80 | 100
  }
}

export interface CoupleProfile {
  person1_age: number
  person2_age: number
  // ⚠️ Suppression person1_gender / person2_gender
  total_capital: number
}

// ⚠️ Gender reste dans le type (utilisé par tables JSON)
// Mais plus dans les inputs utilisateur
export type Gender = 'homme' | 'femme'
```

### 6. Interface utilisateur `RenteCalculator.tsx`

```typescript
// src/components/Calculator/RenteCalculator.tsx

export default function RenteCalculator() {
  const [age, setAge] = useState<number>(65)
  const [capital, setCapital] = useState<number>(100000)
  // ⚠️ SUPPRIMER : const [gender, setGender] = useState<Gender>('homme')
  
  const [showReversion, setShowReversion] = useState(false)
  const [spouseAge, setSpouseAge] = useState<number>(63)
  const [reversionPercentage, setReversionPercentage] = useState<60 | 80 | 100>(60)
  
  const [result, setResult] = useState<AnnuityResult | null>(null)
  
  // Calcul en temps réel
  useEffect(() => {
    const input: CalculatorInput = {
      age,
      capital,
      // ⚠️ SUPPRIMER : gender,
      reversion: showReversion ? {
        enabled: true,
        spouse_age: spouseAge,
        percentage: reversionPercentage
      } : {
        enabled: false
      }
    }
    
    const calculatedResult = calculateAnnuity(input)
    setResult(calculatedResult)
  }, [age, capital, showReversion, spouseAge, reversionPercentage])  // ⚠️ Retirer gender
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Formulaire */}
      <div className="bg-white rounded-2xl border p-8 mb-6">
        {/* Âge */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Votre âge</label>
          <input 
            type="number" 
            min="50" 
            max="90" 
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        
        {/* Capital */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Capital (€)</label>
          <input 
            type="number" 
            min="10000" 
            max="1000000" 
            step="10000"
            value={capital}
            onChange={(e) => setCapital(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        
        {/* ⚠️ SUPPRIMER COMPLÈTEMENT : Toggle Homme/Femme */}
        
        {/* Note pédagogique */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>ℹ️ Table de mortalité unisexe</strong><br />
            Depuis le 21 décembre 2012, les assureurs utilisent une table unique
            pour hommes et femmes (moyenne pondérée). Ce calculateur applique
            cette réglementation obligatoire.
          </p>
          <p className="text-xs text-blue-700 mt-2">
            Biologiquement, les femmes vivent ~4 ans de plus que les hommes
            (espérance vie 24,1 vs 20,4 ans à 65 ans), mais la loi impose
            un tarif identique depuis l'arrêt CJUE de mars 2011.
          </p>
        </div>
        
        {/* Réversion (reste inchangée) */}
        {/* ... */}
      </div>
      
      {/* Résultats */}
      {result && (
        <div className="bg-white rounded-2xl border p-8">
          <h3 className="text-xl font-semibold mb-4">Votre rente viagère</h3>
          
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600">
              {formatEuro(result.monthly_amount)}/mois
            </div>
            <div className="text-sm text-gray-600 mt-2">
              Soit {formatEuro(result.annual_amount)}/an
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-600">Espérance de vie</div>
              <div className="text-lg font-semibold">{result.life_expectancy.toFixed(1)} ans</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total espéré</div>
              <div className="text-lg font-semibold">{formatEuro(result.total_expected_payout)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Seuil rentabilité</div>
              <div className="text-lg font-semibold">{result.roi_years.toFixed(1)} ans</div>
            </div>
          </div>
          
          {/* Note additionnelle */}
          <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded">
            <p className="text-xs text-gray-700">
              💡 <strong>Calcul conforme 2012</strong> : Ces montants utilisent
              la table de mortalité unisexe obligatoire. L'espérance de vie affichée
              ({result.life_expectancy.toFixed(1)} ans) est une moyenne pondérée
              hommes/femmes (48%/52%).
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
```

### 7. Mêmes modifications pour `InverseCalculator.tsx` et `CoupleCalculator.tsx`

Supprimer tous les toggles homme/femme, ajouter notes pédagogiques.

---

## 📝 Article blog à mettre à jour

Remplacer section actuelle par :

```markdown
### Table de mortalité unisexe (réglementation 2012)

Depuis le 21 décembre 2012, suite à l'arrêt de la Cour de justice de l'Union
européenne du 1er mars 2011, les assureurs doivent utiliser une **table de
mortalité unisexe** pour calculer les rentes viagères.

Avant cette réforme, un homme de 65 ans touchait environ 614€/mois pour 100 000€,
tandis qu'une femme du même âge ne touchait que 551€/mois (espérance de vie plus longue).

Aujourd'hui, **homme et femme touchent le même montant** : environ 580€/mois à 65 ans
(moyenne pondérée 48% hommes, 52% femmes selon la démographie française).

**Pourquoi cette différence biologique existe-t-elle ?**

Biologiquement, l'espérance de vie à 65 ans est différente :
- Homme : 20,4 ans (décès moyen à 85,4 ans)
- Femme : 24,1 ans (décès moyen à 89,1 ans)

Puisque les femmes vivent en moyenne 4 ans de plus, elles toucheraient leur rente
plus longtemps. Les assureurs devaient donc leur verser des montants mensuels plus
faibles pour compenser.

Mais la Cour européenne a jugé cette pratique discriminatoire. Résultat : table
unique pour tous, basée sur une moyenne pondérée de la population.

**Impact concret** :

| Profil | Avant 2012 | Depuis 2012 | Gagnant |
|--------|-----------|-------------|---------|
| Homme 65 ans, 100k€ | 614€/mois | 580€/mois | 👎 Perd 34€ |
| Femme 65 ans, 100k€ | 551€/mois | 580€/mois | 👍 Gagne 29€ |

Les hommes ont perdu ~6% de rente, les femmes ont gagné ~5%.

**Notre calculateur applique cette réglementation** : vous voyez directement le
montant réel que vous proposera un assureur en 2026, sans différenciation de sexe.
```

---

## 🧪 Tests à effectuer

Après modifications :

```bash
# Test 1 : Rente simple
Capital : 100 000€
Âge : 65 ans
Résultat attendu : ~580€/mois (ni 614€ homme, ni 551€ femme)

# Test 2 : Réversion
Capital : 100 000€
Âge titulaire : 65 ans
Âge conjoint : 63 ans
Réversion : 80%
Résultat attendu : ~410€/mois couple vivant, ~328€/mois après décès

# Test 3 : Calcul inverse
Rente souhaitée : 1 000€/mois
Âge : 70 ans
Résultat attendu : ~145 000€ capital nécessaire

# Test 4 : Mode couple
Personne 1 : 67 ans
Personne 2 : 64 ans
Capital : 180 000€
Résultat attendu : 7 stratégies calculées correctement
```

---

## ✅ Checklist implémentation

- [ ] Créer `calculateLastSurvivorFactorUnisex()`
- [ ] Créer `calculateSurvivalProbabilityUnisex()`
- [ ] Mettre à jour `calculateReversionAnnuity()`
- [ ] Mettre à jour `calculateRequiredCapital()`
- [ ] Mettre à jour `calculateCoupleStrategies()`
- [ ] Mettre à jour `CalculatorInput` types
- [ ] Mettre à jour `CoupleProfile` types
- [ ] Supprimer toggle sexe dans `RenteCalculator.tsx`
- [ ] Supprimer toggle sexe dans `InverseCalculator.tsx`
- [ ] Supprimer toggle sexe dans `CoupleCalculator.tsx`
- [ ] Ajouter notes pédagogiques dans chaque calculateur
- [ ] Mettre à jour article blog
- [ ] Tester avec valeurs de référence
- [ ] Vérifier build Next.js sans erreurs TypeScript

---

## 📊 Valeurs de référence (test manuel)

```
// Facteurs viagers à 65 ans (tables INSEE 2022)
Homme : 16.29
Femme : 18.16
Unisexe (48% H + 52% F) : (16.29 × 0.48) + (18.16 × 0.52) = 17.27

// Rente 100 000€
Homme avant 2012 : 100000 / 16.29 / 12 = 614€/mois
Femme avant 2012 : 100000 / 18.16 / 12 = 551€/mois
Unisexe depuis 2012 : 100000 / 17.27 / 12 = 483€/mois

⚠️ Note : Mes calculs donnent 483€ mais l'article mentionne 580€.
Vérifier si facteur viager unisexe réel des assureurs est différent.
Possiblement un facteur de majoration/frais ?
```

---

**Temps estimé total** : 3-4 heures
**Difficulté** : Moyenne (nombreuses dépendances)
**Impact** : Conformité légale + simplification UX
