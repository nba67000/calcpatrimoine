// src/types/alerts.ts

export interface Warning {
  type: 'danger' | 'warning' | 'info'
  message: string
}

export interface Optimisation {
  type: 'success' | 'info'
  message: string
  gain?: number
}
