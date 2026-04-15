// src/components/ProjectionChart.tsx
'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import { formatEuro } from '@/lib/mortality'

interface ProjectionChartProps {
  capital: number
  monthlyRent: number
  lifeExpectancy: number
}

export default function ProjectionChart({ capital, monthlyRent, lifeExpectancy }: ProjectionChartProps) {
  // Générer les données pour 30 ans maximum (ou espérance de vie + 5 ans)
  const maxYears = Math.min(30, Math.ceil(lifeExpectancy) + 5)
  
  const data = Array.from({ length: maxYears + 1 }, (_, year) => {
    const renteCumulee = monthlyRent * 12 * year
    
    return {
      annee: year,
      capital: capital,
      renteCumulee: renteCumulee,
    }
  })

  // Calculer le seuil de rentabilité (breakeven) : année où rente cumulée > capital
  const breakEvenYear = capital / (monthlyRent * 12)
  const breakEvenYearRounded = Math.ceil(breakEvenYear)
  const breakEvenYearDisplay = breakEvenYear.toFixed(1) // Affichage avec 1 décimale

  // Formatter pour l'axe Y (montants en euros)
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M€`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k€`
    return `${value}€`
  }

  // Formatter pour le tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-neutral-300 rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold text-neutral-900 mb-2">Année {label}</p>
          <p className="text-sm text-primary-700">
            Capital initial : <span className="font-medium">{formatEuro(payload[0].value)}</span>
          </p>
          <p className="text-sm text-success-700">
            Rente cumulée : <span className="font-medium">{formatEuro(payload[1].value)}</span>
          </p>
          {Math.abs(label - breakEvenYear) < 0.5 && (
            <p className="text-xs text-success-600 mt-1 font-medium">✅ Seuil de rentabilité atteint</p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      {/* Titre */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900">
          📈 Projection sur {maxYears} ans
        </h3>
        <div className="text-sm text-neutral-600">
          Seuil de rentabilité : <span className="font-semibold text-success-600">{breakEvenYearDisplay} ans</span>
        </div>
      </div>

      {/* Graphique */}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          
          <XAxis
            dataKey="annee"
            label={{ value: 'Années', position: 'insideBottom', offset: -5 }}
            tick={{ fontSize: 12 }}
            stroke="#64748B"
          />
          
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 12 }}
            stroke="#64748B"
            width={70}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Legend
            wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
            iconType="line"
          />
          
          {/* Ligne de référence au seuil de rentabilité */}
          <ReferenceLine
            x={breakEvenYear}
            stroke="#059669"
            strokeDasharray="5 5"
            label={{
              value: '✅',
              position: 'top',
              fontSize: 16,
            }}
          />
          
          {/* Capital initial (ligne horizontale) */}
          <Line
            type="monotone"
            dataKey="capital"
            stroke="#2E4A6F"
            strokeWidth={2}
            name="Capital initial"
            dot={false}
            activeDot={{ r: 6 }}
          />
          
          {/* Rente cumulée (ligne croissante) */}
          <Line
            type="monotone"
            dataKey="renteCumulee"
            stroke="#059669"
            strokeWidth={2}
            name="Rente cumulée"
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Explication pédagogique */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <p className="text-sm text-primary-900">
          💡 <strong>Comment lire ce graphique ?</strong>
        </p>
        <p className="text-sm text-primary-800 mt-2">
          La ligne bleue représente votre capital initial ({formatEuro(capital)}).
          La ligne verte montre le total des rentes perçues au fil des années.
        </p>
        <p className="text-sm text-primary-800 mt-2">
          <strong>Seuil de rentabilité ({breakEvenYearDisplay} ans)</strong> : À partir de cette année,
          vous aurez perçu plus que votre capital initial. Plus vous vivez longtemps
          après ce seuil, plus la rente viagère devient avantageuse.
        </p>
      </div>
    </div>
  )
}
