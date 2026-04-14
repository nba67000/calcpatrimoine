// src/types/index.ts

export type Gender = 'homme' | 'femme'

export interface MortalityData {
  age: number
  annuity_factor: number      // a(x) - facteur viager
  life_expectancy: number      // espérance de vie restante
  mortality_rate: number       // taux de mortalité qx
}

export interface MortalityTables {
  metadata: {
    source: string
    year: number
    tech_rate: number
    description: string
    last_updated: string
  }
  tables: {
    homme: MortalityData[]
    femme: MortalityData[]
  }
}

export interface CalculatorInput {
  age: number
  capital: number
  gender: Gender
  reversion?: {
    enabled: boolean
    spouse_age?: number
    percentage?: 60 | 80 | 100  // Pourcentage de réversion
  }
  deferred_years?: number       // Rente différée (optionnel)
}

export interface AnnuityResult {
  monthly_amount: number        // Montant mensuel de la rente
  annual_amount: number         // Montant annuel
  life_expectancy: number       // Espérance de vie
  total_expected_payout: number // Total espéré sur espérance de vie
  roi_years: number            // Nombre d'années pour récupérer le capital
  
  // Avec réversion
  with_reversion?: {
    monthly_amount: number
    spouse_monthly_amount: number
    joint_life_expectancy: number
  }
  
  // Métadata
  annuity_factor: number       // a(x) utilisé
  tech_rate: number            // Taux technique appliqué
}

export interface ComparisonScenario {
  label: string
  monthly_amount: number
  config: CalculatorInput
}

export interface LeadData {
  age: number
  capital: number
  gender: Gender
  estimated_monthly: number
  email: string
  phone?: string
  timestamp: string
  utm_source?: string
  utm_campaign?: string
}

// Calculateur inverse
export interface InverseCalculatorInput {
  age: number
  gender: Gender
  desired_monthly_amount: number
  reversion?: {
    enabled: boolean
    spouse_age?: number
    percentage?: 60 | 80 | 100
  }
}

export interface InverseResult {
  required_capital: number
  annuity_factor: number
  life_expectancy: number
  tech_rate: number
}

// Mode couple
export interface CoupleProfile {
  age: number
  gender: Gender
  capital: number
}

export interface CoupleCalculation {
  person1_solo: AnnuityResult
  person2_solo: AnnuityResult
  joint_with_reversion_60: AnnuityResult
  joint_with_reversion_80: AnnuityResult
  joint_with_reversion_100: AnnuityResult
  p2_joint_with_reversion_60: AnnuityResult
  p2_joint_with_reversion_80: AnnuityResult
  p2_joint_with_reversion_100: AnnuityResult
  recommendation: 'person1_solo' | 'joint_60' | 'joint_80' | 'joint_100' | 'p2_joint_60' | 'p2_joint_80' | 'p2_joint_100'
  total_capital: number
}
