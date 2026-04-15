# Open Graph Image - Instructions

## Image à créer : og-image.png

**Dimensions** : 1200 x 630 px

**Placement** : `public/og-image.png`

**Contenu suggéré** :
```
┌──────────────────────────────────────────┐
│                                          │
│  [Logo C bleu marine]                    │
│                                          │
│  CalcPatrimoine                          │
│                                          │
│  Calculateur de Rente Viagère           │
│  Gratuit & Open Source                   │
│                                          │
│  ✓ Tables INSEE 2022                     │
│  ✓ Sans inscription                      │
│  ✓ Données non conservées                │
│                                          │
│  calcpatrimoine.fr                       │
│                                          │
└──────────────────────────────────────────┘
```

**Couleurs** :
- Background : Bleu marine (#0A2540)
- Texte : Blanc (#FFFFFF)
- Accents : Vert émeraude (#059669)

**Outils pour créer** :
- Canva : https://www.canva.com/fr_fr/
- Figma : https://www.figma.com/
- Photopea : https://www.photopea.com/ (gratuit)

## Alternative : Générer avec Next.js (avancé)

Next.js peut générer des OG images dynamiques :
```tsx
// src/app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'CalcPatrimoine'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ /* ... */ }}>
        CalcPatrimoine
      </div>
    ),
    { ...size }
  )
}
```

Voir : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
