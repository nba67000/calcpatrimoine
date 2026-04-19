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
 const maxYears = Math.min(30, Math.ceil(lifeExpectancy) + 5)
 
 const data = Array.from({ length: maxYears + 1 }, (_, year) => {
 const renteCumulee = monthlyRent * 12 * year
 return {
 annee: year,
 capital: capital,
 renteCumulee: renteCumulee,
 }
 })

 const breakEvenYear = capital / (monthlyRent * 12)
 const breakEvenYearDisplay = breakEvenYear.toFixed(1)

 const formatYAxis = (value: number) => {
 if (value>= 1000000) return `${(value / 1000000).toFixed(1)}M€`
 if (value>= 1000) return `${(value / 1000).toFixed(0)}k€`
 return `${value}€`
 }

 const CustomTooltip = ({ active, payload, label }: any) => {
 if (active && payload && payload.length) {
 return (
 <div className="bg-white border border-neutral-300 rounded-lg shadow-lg p-3">
 <p className="text-sm font-semibold text-neutral-900 mb-2">Année {label}</p>
 <p className="text-sm text-primary-700">
 Capital initial : <span className="font-medium">{formatEuro(payload[0].value)}</span>
 </p>
 <p className="text-sm text-primary-600">
 Rente cumulée : <span className="font-medium">{formatEuro(payload[1].value)}</span>
 </p>
 </div>
 )
 }
 return null
 }

 return (
 <div className="w-full">
 <h3 className="text-lg font-semibold text-neutral-900 mb-4">
 Projection dans le temps
 </h3>
 <p className="text-sm text-neutral-600 mb-6">
 Capital initial vs rentes cumulées sur {maxYears} ans. 
 Seuil de rentabilité atteint à l&apos;année {breakEvenYearDisplay}.
 </p>

 <ResponsiveContainer width="100%" height={380}>
 <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
 <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
 <XAxis 
 dataKey="annee" 
 stroke="#64748B"
 label={{ value: 'Années', position: 'insideBottom', offset: -5, style: { fill: '#64748B', fontSize: 12 } }}
 tick={{ fontSize: 11 }}
 />
 <YAxis 
 tickFormatter={formatYAxis}
 stroke="#64748B"
 tick={{ fontSize: 11 }}
 />
 <Tooltip content={<CustomTooltip />} />
 <Legend 
 wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
 />
 <ReferenceLine 
 x={breakEvenYear} 
 stroke="#2E4A6F" 
 strokeDasharray="4 4"
 label={{ 
 value: `Seuil : ${breakEvenYearDisplay} ans`, 
 position: 'top',
 fill: '#2E4A6F',
 fontSize: 11,
 fontWeight: 600
 }}
 />
 <Line 
 type="monotone" 
 dataKey="capital" 
 name="Capital initial"
 stroke="#1E3A5F"
 strokeWidth={2}
 dot={false}
 />
 <Line 
 type="monotone" 
 dataKey="renteCumulee" 
 name="Rente cumulée"
 stroke="#2E4A6F"
 strokeWidth={2.5}
 dot={false}
 />
 </LineChart>
 </ResponsiveContainer>
 </div>
 )
}
