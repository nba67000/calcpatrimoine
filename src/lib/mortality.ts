// src/lib/mortality.ts
import type { 
  MortalityTables, 
  Gender, 
  CalculatorInput, 
  AnnuityResult,
  MortalityData,
  InverseResult,
  CoupleProfile,
  CoupleCalculation
} from '@/types'

// Import des tables INSEE (sera généré par le script Python)
import mortalityTablesData from '../../public/mortality_tables.json'

const mortalityTables = mortalityTablesData as MortalityTables

/**
 * Calcule la probabilité de survie t_px (probabilité qu'une tête d'âge x survive t années)
 * 
 * Formule : t_px = Π[k=0 to t-1] (1 - q_(x+k))
 * où q_(x+k) = taux de mortalité à l'âge x+k
 */
function calculateSurvivalProbability(
  age: number,
  gender: Gender,
  years: number
): number {
  let survivalProb = 1.0
  
  for (let k = 0; k < years; k++) {
    const data = getMortalityData(age + k, gender)
    if (!data) {
      // Si on dépasse les données disponibles, on arrête
      break
    }
    
    // q_x = taux de mortalité annuel
    // p_x = 1 - q_x = taux de survie annuel
    const p_x = 1 - data.mortality_rate
    survivalProb *= p_x
  }
  
  return survivalProb
}

/**
 * Calcule le facteur viager "dernier décès" pour un couple
 * 
 * Formule actuarielle exacte (Esch p.18) :
 * a_xy_barre = Σ[t=1,∞] v^t · t_pxy_barre
 * où :
 * - t_pxy_barre = t_px + t_py - t_px·t_py (au moins un des deux survit)
 * - v^t = (1/(1+i))^t (facteur d'actualisation)
 */
function calculateLastSurvivorFactor(
  age1: number,
  gender1: Gender,
  age2: number,
  gender2: Gender,
  techRate: number
): number {
  let factor = 0
  const maxYears = 60 // On calcule jusqu'à 60 ans dans le futur (suffisant)
  
  for (let t = 1; t <= maxYears; t++) {
    // Probabilités de survie individuelles
    const t_px = calculateSurvivalProbability(age1, gender1, t)
    const t_py = calculateSurvivalProbability(age2, gender2, t)
    
    // Si probabilité devient négligeable, on arrête
    if (t_px < 0.001 && t_py < 0.001) {
      break
    }
    
    // Probabilité qu'au moins un des deux survive
    // Formule : t_pxy_barre = t_px + t_py - t_px·t_py
    const t_pxy_bar = t_px + t_py - (t_px * t_py)
    
    // Facteur d'actualisation
    const v_t = Math.pow(1 / (1 + techRate), t)
    
    // Accumulation
    factor += t_pxy_bar * v_t
  }
  
  return factor
}

/**
 * Récupère les données de mortalité pour un âge et sexe donnés
 */
export function getMortalityData(age: number, gender: Gender): MortalityData | null {
  const table = mortalityTables.tables[gender]
  return table.find(d => d.age === age) || null
}

/**
 * Calcule la rente viagère immédiate (sans réversion)
 * 
 * Formule : R = C / a(x)
 * où :
 * - R = rente annuelle
 * - C = capital
 * - a(x) = facteur viager (valeur actuarielle)
 */
export function calculateSimpleAnnuity(
  capital: number,
  age: number,
  gender: Gender
): AnnuityResult | null {
  const data = getMortalityData(age, gender)
  
  if (!data) {
    console.error(`Pas de données pour âge ${age} et sexe ${gender}`)
    return null
  }
  
  const annualAmount = capital / data.annuity_factor
  const monthlyAmount = annualAmount / 12
  const totalExpectedPayout = annualAmount * data.life_expectancy
  const roiYears = capital / annualAmount
  
  return {
    monthly_amount: Math.round(monthlyAmount),
    annual_amount: Math.round(annualAmount),
    life_expectancy: data.life_expectancy,
    total_expected_payout: Math.round(totalExpectedPayout),
    roi_years: Math.round(roiYears * 10) / 10,
    annuity_factor: data.annuity_factor,
    tech_rate: mortalityTables.metadata.tech_rate
  }
}

/**
 * Calcule la rente avec réversion au conjoint
 * 
 * Formule actuarielle exacte :
 * R = C / [a(x) + p · a_xy_barre]
 * où :
 * - a(x) = facteur viager tête principale
 * - p = pourcentage de réversion (0.6, 0.8, 1.0)
 * - a_xy_barre = facteur viager "dernier décès" (au moins un des deux survit)
 * 
 * Référence : Louis Esch, Calcul actuariel, Chapitre 3, p.18
 */
export function calculateReversionAnnuity(
  capital: number,
  age: number,
  gender: Gender,
  spouseAge: number,
  reversionPercentage: 60 | 80 | 100
): AnnuityResult | null {
  const mainData = getMortalityData(age, gender)
  const spouseGender: Gender = gender === 'homme' ? 'femme' : 'homme'
  const spouseData = getMortalityData(spouseAge, spouseGender)
  
  if (!mainData || !spouseData) {
    return null
  }
  
  const techRate = mortalityTables.metadata.tech_rate
  const p = reversionPercentage / 100
  
  // Calcul rigoureux du facteur viager "dernier décès"
  const lastSurvivorFactor = calculateLastSurvivorFactor(
    age,
    gender,
    spouseAge,
    spouseGender,
    techRate
  )
  
  // Facteur viager avec réversion (formule actuarielle exacte)
  const jointFactor = mainData.annuity_factor + (p * lastSurvivorFactor)
  
  const annualAmount = capital / jointFactor
  const monthlyAmount = annualAmount / 12
  const spouseMonthlyAmount = (monthlyAmount * p)
  
  // Espérance de vie conjointe (max des deux espérances)
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

/**
 * Calcule la rente différée (début dans N années)
 * 
 * Formule : R = C * (1+i)^n / a(x+n)
 * où :
 * - i = taux technique
 * - n = années de différé
 */
export function calculateDeferredAnnuity(
  capital: number,
  currentAge: number,
  gender: Gender,
  deferredYears: number
): AnnuityResult | null {
  const futureAge = currentAge + deferredYears
  const futureData = getMortalityData(futureAge, gender)
  
  if (!futureData) {
    return null
  }
  
  const techRate = mortalityTables.metadata.tech_rate
  const adjustedCapital = capital * Math.pow(1 + techRate, deferredYears)
  
  const annualAmount = adjustedCapital / futureData.annuity_factor
  const monthlyAmount = annualAmount / 12
  
  return {
    monthly_amount: Math.round(monthlyAmount),
    annual_amount: Math.round(annualAmount),
    life_expectancy: futureData.life_expectancy,
    total_expected_payout: Math.round(annualAmount * futureData.life_expectancy),
    roi_years: Math.round((capital / annualAmount) * 10) / 10,
    annuity_factor: futureData.annuity_factor,
    tech_rate: techRate
  }
}

/**
 * Fonction principale : calcule selon la configuration fournie
 */
export function calculateAnnuity(input: CalculatorInput): AnnuityResult | null {
  // Validation
  if (input.age < 50 || input.age > 90) {
    console.error('Âge doit être entre 50 et 90 ans')
    return null
  }
  
  if (input.capital < 10000) {
    console.error('Capital minimum : 10 000€')
    return null
  }
  
  // Cas 1 : Rente différée
  if (input.deferred_years && input.deferred_years > 0) {
    return calculateDeferredAnnuity(
      input.capital,
      input.age,
      input.gender,
      input.deferred_years
    )
  }
  
  // Cas 2 : Rente avec réversion
  if (input.reversion?.enabled && input.reversion.spouse_age && input.reversion.percentage) {
    return calculateReversionAnnuity(
      input.capital,
      input.age,
      input.gender,
      input.reversion.spouse_age,
      input.reversion.percentage
    )
  }
  
  // Cas 3 : Rente simple (par défaut)
  return calculateSimpleAnnuity(input.capital, input.age, input.gender)
}

/**
 * Génère des scénarios de comparaison
 */
export function generateComparisonScenarios(
  baseInput: CalculatorInput
): Array<{ label: string; result: AnnuityResult | null }> {
  const scenarios = [
    {
      label: 'Sans réversion',
      input: { ...baseInput, reversion: { enabled: false } }
    },
    {
      label: 'Réversion 60%',
      input: { 
        ...baseInput, 
        reversion: { 
          enabled: true, 
          spouse_age: baseInput.age - 2, // Approximation âge conjoint
          percentage: 60 as const
        } 
      }
    },
    {
      label: 'Réversion 100%',
      input: { 
        ...baseInput, 
        reversion: { 
          enabled: true, 
          spouse_age: baseInput.age - 2,
          percentage: 100 as const
        } 
      }
    }
  ]
  
  return scenarios.map(s => ({
    label: s.label,
    result: calculateAnnuity(s.input)
  }))
}

/**
 * Formate un montant en euros
 */
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Récupère la plage d'âges disponible
 */
export function getAvailableAgeRange(gender: Gender): { min: number; max: number } {
  const table = mortalityTables.tables[gender]
  return {
    min: table[0]?.age || 50,
    max: table[table.length - 1]?.age || 90
  }
}

/**
 * CALCULATEUR INVERSE
 * Calcule le capital nécessaire pour obtenir une rente mensuelle souhaitée
 */
export function calculateRequiredCapital(
  desiredMonthlyAmount: number,
  age: number,
  gender: Gender,
  reversion?: {
    enabled: boolean
    spouse_age?: number
    percentage?: 60 | 80 | 100
  }
): InverseResult | null {
  const data = getMortalityData(age, gender)
  
  if (!data) {
    return null
  }
  
  let annuityFactor = data.annuity_factor
  
  // Si réversion activée, calcul rigoureux du facteur
  if (reversion?.enabled && reversion.spouse_age && reversion.percentage) {
    const spouseGender: Gender = gender === 'homme' ? 'femme' : 'homme'
    const spouseData = getMortalityData(reversion.spouse_age, spouseGender)
    
    if (spouseData) {
      const techRate = mortalityTables.metadata.tech_rate
      const p = reversion.percentage / 100
      
      const lastSurvivorFactor = calculateLastSurvivorFactor(
        age,
        gender,
        reversion.spouse_age,
        spouseGender,
        techRate
      )
      
      annuityFactor = data.annuity_factor + (p * lastSurvivorFactor)
    }
  }
  
  const desiredAnnualAmount = desiredMonthlyAmount * 12
  const requiredCapital = desiredAnnualAmount * annuityFactor
  
  return {
    required_capital: Math.round(requiredCapital),
    annuity_factor: annuityFactor,
    life_expectancy: data.life_expectancy,
    tech_rate: mortalityTables.metadata.tech_rate
  }
}

/**
 * MODE COUPLE
 * Calcule toutes les stratégies possibles pour un couple
 */
export function calculateCoupleStrategies(
  person1: CoupleProfile,
  person2: CoupleProfile
): CoupleCalculation | null {
  // Calculs individuels
  const person1Solo = calculateSimpleAnnuity(person1.capital, person1.age, person1.gender)
  const person2Solo = calculateSimpleAnnuity(person2.capital, person2.age, person2.gender)
  
  if (!person1Solo || !person2Solo) {
    return null
  }
  
  const totalCapital = person1.capital + person2.capital
  
  // Calculs avec réversion (on met le capital total sur la tête de la personne la plus jeune)
  const youngerPerson = person1.age <= person2.age ? person1 : person2
  const olderPerson = person1.age > person2.age ? person1 : person2
  
  const joint60 = calculateReversionAnnuity(
    totalCapital,
    youngerPerson.age,
    youngerPerson.gender,
    olderPerson.age,
    60
  )
  
  const joint80 = calculateReversionAnnuity(
    totalCapital,
    youngerPerson.age,
    youngerPerson.gender,
    olderPerson.age,
    80
  )
  
  const joint100 = calculateReversionAnnuity(
    totalCapital,
    youngerPerson.age,
    youngerPerson.gender,
    olderPerson.age,
    100
  )
  
  if (!joint60 || !joint80 || !joint100) {
    return null
  }
  
  // Déterminer la meilleure stratégie
  // Critère : maximiser la rente mensuelle, puis le total espéré
  const strategies = [
    { name: 'person1_solo' as const, monthly: person1Solo.monthly_amount, total: person1Solo.total_expected_payout },
    { name: 'person2_solo' as const, monthly: person2Solo.monthly_amount, total: person2Solo.total_expected_payout },
    { name: 'joint_60' as const, monthly: joint60.monthly_amount, total: joint60.total_expected_payout },
    { name: 'joint_80' as const, monthly: joint80.monthly_amount, total: joint80.total_expected_payout },
    { name: 'joint_100' as const, monthly: joint100.monthly_amount, total: joint100.total_expected_payout }
  ]
  
  // Trouver la rente mensuelle maximale
  const maxMonthly = Math.max(...strategies.map(s => s.monthly))
  
  // Filtrer les stratégies proches du max (écart < 5%)
  const topStrategies = strategies.filter(s => s.monthly >= maxMonthly * 0.95)
  
  // Parmi celles-ci, prendre celle avec le meilleur total espéré
  const recommendation = topStrategies.reduce((best, current) => 
    current.total > best.total ? current : best
  ).name
  
  return {
    person1_solo: person1Solo,
    person2_solo: person2Solo,
    joint_with_reversion_60: joint60,
    joint_with_reversion_80: joint80,
    joint_with_reversion_100: joint100,
    recommendation,
    total_capital: totalCapital
  }
}
