// src/types/index.ts

export type Gender = 'homme' | 'femme'

export interface MortalityData {
  age: number
  annuity_factor: number
  life_expectancy: number
  mortality_rate: number
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
  reversion?: {
    enabled: boolean
    spouse_age?: number
    percentage?: 60 | 80 | 100
  }
}

export interface AnnuityResult {
  monthly_amount: number
  annual_amount: number
  life_expectancy: number
  total_expected_payout: number
  roi_years: number
  with_reversion?: {
    monthly_amount: number
    spouse_monthly_amount: number
    joint_life_expectancy: number
  }
  annuity_factor: number
  tech_rate: number
}

export interface InverseResult {
  required_capital: number
  monthly_amount: number
  annual_amount: number
  life_expectancy: number
  total_payout: number
  tech_rate: number
}

export interface CoupleProfile {
  person1_age: number
  person2_age: number
  total_capital: number
}

export interface CoupleCalculation {
  strategy: string
  monthly_amount: number
  description: string
  life_expectancy?: number
  total_payout?: number
}
