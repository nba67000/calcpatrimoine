import { ImageResponse } from 'next/og'

export const alt = 'CalculPatrimoine - Calculateurs patrimoniaux gratuits et open-source'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#F7F3EC',
          padding: '80px',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '6px',
            width: '140px',
            backgroundColor: '#D4AF37',
            marginBottom: '64px',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '28px',
              color: '#999999',
              letterSpacing: '4px',
              marginBottom: '36px',
              fontFamily: 'monospace',
            }}
          >
            CALCUL PATRIMONIAL · FRANCE
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '112px',
              color: '#0A2540',
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: '40px',
              letterSpacing: '-2px',
            }}
          >
            CalculPatrimoine
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '46px',
              color: '#444444',
              lineHeight: 1.3,
              maxWidth: '900px',
            }}
          >
            Calculateurs patrimoniaux gratuits et open-source
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'monospace',
            fontSize: '22px',
            color: '#666666',
            borderTop: '1px solid #D4C8B0',
            paddingTop: '28px',
          }}
        >
          <div style={{ display: 'flex' }}>calculpatrimoine.fr</div>
          <div style={{ display: 'flex' }}>Sources : CGI · BOFiP · INSEE</div>
        </div>
      </div>
    ),
    size,
  )
}
