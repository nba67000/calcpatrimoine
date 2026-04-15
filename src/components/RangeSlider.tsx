// src/components/RangeSlider.tsx
'use client'

import { CSSProperties } from 'react'

interface RangeSliderProps {
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
  minLabel: string
  maxLabel: string
}

export default function RangeSlider({
  min,
  max,
  step,
  value,
  onChange,
  minLabel,
  maxLabel,
}: RangeSliderProps) {
  const sliderStyle: CSSProperties = {
    WebkitAppearance: 'none',
    appearance: 'none',
    width: '100%',
    height: '8px',
    background: 'linear-gradient(to right, #D1DDE9 0%, #2E4A6F 100%)',
    borderRadius: '8px',
    outline: 'none',
    border: '1px solid #94A3B8',
    cursor: 'pointer',
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .calcpatrimoine-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #2E4A6F;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
          cursor: grab;
          transition: all 0.2s ease-in-out;
        }
        
        .calcpatrimoine-range-slider::-webkit-slider-thumb:hover {
          background: #1E3A5F;
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(46, 74, 111, 0.4);
        }
        
        .calcpatrimoine-range-slider::-webkit-slider-thumb:active {
          cursor: grabbing;
        }
        
        .calcpatrimoine-range-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #2E4A6F;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
          cursor: grab;
          transition: all 0.2s ease-in-out;
        }
        
        .calcpatrimoine-range-slider::-moz-range-thumb:hover {
          background: #1E3A5F;
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(46, 74, 111, 0.4);
        }
        
        .calcpatrimoine-range-slider::-moz-range-thumb:active {
          cursor: grabbing;
        }
        
        .calcpatrimoine-range-slider::-moz-range-track {
          background: linear-gradient(to right, #D1DDE9 0%, #2E4A6F 100%);
          height: 8px;
          border-radius: 8px;
          border: 1px solid #94A3B8;
        }
      `}} />
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="calcpatrimoine-range-slider"
        style={sliderStyle}
      />
      
      <div className="flex justify-between text-xs text-neutral-400 mt-1">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </>
  )
}
