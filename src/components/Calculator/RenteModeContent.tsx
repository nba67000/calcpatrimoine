// src/components/Calculator/RenteModeContent.tsx
'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import LegalDisclaimer from '@/components/LegalDisclaimer'

type CalculatorMode = 'standard' | 'inverse' | 'couple'

const MODES: { id: CalculatorMode; label: string; desc: string }[] = [
  { id: 'standard', label: 'Calculateur classique', desc: "Calculez le montant de votre rente mensuelle à partir d'un capital." },
  { id: 'inverse',  label: 'Calculateur inverse',   desc: "Découvrez quel capital est nécessaire pour obtenir la rente souhaitée." },
  { id: 'couple',   label: 'Mode couple',            desc: "Comparez toutes les stratégies pour optimiser vos rentes à deux." },
]

const RenteCalculator   = dynamic(() => import('./RenteCalculator'),   { ssr: false })
const InverseCalculator = dynamic(() => import('./InverseCalculator'), { ssr: false })
const CoupleCalculator  = dynamic(() => import('./CoupleCalculator'),  { ssr: false })

export default function RenteModeContent() {
  const [mode, setMode] = useState<CalculatorMode>('standard')

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <LegalDisclaimer />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex mb-2">
          <div className="flex border border-neutral-300 overflow-x-auto">
            {MODES.map(m => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-4 sm:px-6 py-3 font-mono text-xs font-medium transition-colors whitespace-nowrap ${
                  mode === m.id
                    ? 'bg-primary-700 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <p className="font-mono text-xs text-neutral-500 mb-8">
          {MODES.find(m => m.id === mode)?.desc}
        </p>

        {mode === 'standard' && <RenteCalculator />}
        {mode === 'inverse'  && <InverseCalculator />}
        {mode === 'couple'   && <CoupleCalculator />}
      </div>
    </>
  )
}
