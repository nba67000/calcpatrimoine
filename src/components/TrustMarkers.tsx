// src/components/TrustMarkers.tsx
import { TRUST_MARKERS } from '@/lib/constants'
import Icon from '@/components/Icon'

export default function TrustMarkers() {
  return (
    <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-100">
      {TRUST_MARKERS.map((marker, index) => (
        <div key={index} className="flex items-center gap-2">
          <Icon name="check" size={18} />
          <span className="font-medium">{marker.text}</span>
        </div>
      ))}
    </div>
  )
}
