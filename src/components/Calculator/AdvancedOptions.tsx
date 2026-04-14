// src/components/Calculator/AdvancedOptions.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface AdvancedOptionsState {
  enabled: boolean
  customTechRate?: number
  guaranteedYears?: number
  deferredReversionYears?: number
}

interface AdvancedOptionsProps {
  value: AdvancedOptionsState
  onChange: (value: AdvancedOptionsState) => void
  showReversionOptions?: boolean
}

export default function AdvancedOptions({ value, onChange, showReversionOptions = false }: AdvancedOptionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">⚙️ Options avancées</span>
          {value.enabled && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
              Actif
            </span>
          )}
        </div>
        <span className="text-gray-500">{isOpen ? '▼' : '▶'}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              {/* Taux technique personnalisé */}
              <div>
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={value.customTechRate !== undefined}
                    onChange={(e) => {
                      onChange({
                        ...value,
                        customTechRate: e.target.checked ? 0.5 : undefined,
                        enabled: e.target.checked || value.guaranteedYears !== undefined || value.deferredReversionYears !== undefined
                      })
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Taux technique personnalisé
                  </span>
                </label>
                
                {value.customTechRate !== undefined && (
                  <div className="ml-6">
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={0}
                        max={2}
                        step={0.1}
                        value={value.customTechRate}
                        onChange={(e) => {
                          onChange({
                            ...value,
                            customTechRate: Number(e.target.value)
                          })
                        }}
                        className="flex-1"
                      />
                      <input
                        type="number"
                        min={0}
                        max={2}
                        step={0.1}
                        value={value.customTechRate}
                        onChange={(e) => {
                          const val = Number(e.target.value)
                          if (val >= 0 && val <= 2) {
                            onChange({
                              ...value,
                              customTechRate: val
                            })
                          }
                        }}
                        className="w-16 px-2 py-1 text-sm text-center border border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-600">%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Taux par défaut : 0.5% • Plus élevé = rente plus faible
                    </p>
                  </div>
                )}
              </div>

              {/* Rente certaine */}
              <div>
                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={value.guaranteedYears !== undefined}
                    onChange={(e) => {
                      onChange({
                        ...value,
                        guaranteedYears: e.target.checked ? 10 : undefined,
                        enabled: e.target.checked || value.customTechRate !== undefined || value.deferredReversionYears !== undefined
                      })
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Rente certaine (garantie)
                  </span>
                </label>
                
                {value.guaranteedYears !== undefined && (
                  <div className="ml-6">
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={5}
                        max={20}
                        step={1}
                        value={value.guaranteedYears}
                        onChange={(e) => {
                          onChange({
                            ...value,
                            guaranteedYears: Number(e.target.value)
                          })
                        }}
                        className="flex-1"
                      />
                      <input
                        type="number"
                        min={5}
                        max={20}
                        value={value.guaranteedYears}
                        onChange={(e) => {
                          const val = Number(e.target.value)
                          if (val >= 5 && val <= 20) {
                            onChange({
                              ...value,
                              guaranteedYears: val
                            })
                          }
                        }}
                        className="w-16 px-2 py-1 text-sm text-center border border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-600">ans</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Rente versée pendant au moins {value.guaranteedYears} ans, même en cas de décès précoce
                    </p>
                  </div>
                )}
              </div>

              {/* Réversion différée (seulement si réversion activée) */}
              {showReversionOptions && (
                <div>
                  <label className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={value.deferredReversionYears !== undefined}
                      onChange={(e) => {
                        onChange({
                          ...value,
                          deferredReversionYears: e.target.checked ? 5 : undefined,
                          enabled: e.target.checked || value.customTechRate !== undefined || value.guaranteedYears !== undefined
                        })
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Réversion différée
                    </span>
                  </label>
                  
                  {value.deferredReversionYears !== undefined && (
                    <div className="ml-6">
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min={1}
                          max={15}
                          step={1}
                          value={value.deferredReversionYears}
                          onChange={(e) => {
                            onChange({
                              ...value,
                              deferredReversionYears: Number(e.target.value)
                            })
                          }}
                          className="flex-1"
                        />
                        <input
                          type="number"
                          min={1}
                          max={15}
                          value={value.deferredReversionYears}
                          onChange={(e) => {
                            const val = Number(e.target.value)
                            if (val >= 1 && val <= 15) {
                              onChange({
                                ...value,
                                deferredReversionYears: val
                              })
                            }
                          }}
                          className="w-16 px-2 py-1 text-sm text-center border border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-600">ans</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        La réversion au conjoint démarre seulement après {value.deferredReversionYears} ans
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  💡 Les options avancées modifient le montant de la rente. Elles sont rarement proposées par les assureurs français.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
