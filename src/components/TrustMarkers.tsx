// src/components/TrustMarkers.tsx
import { TRUST_MARKERS } from '@/lib/constants'

export default function TrustMarkers() {
  return (
    <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-100">
      {TRUST_MARKERS.map((marker, index) => (
        <div key={index} className="flex items-center gap-2">
          <svg 
            className="w-5 h-5 text-success-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
          <span className="font-medium">{marker.text}</span>
        </div>
      ))}
    </div>
  )
}
