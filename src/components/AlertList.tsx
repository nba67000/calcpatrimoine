type AlertItem = {
  type: 'danger' | 'warning' | 'info' | 'success'
  message: string
  gain?: number
}

const STYLES: Record<AlertItem['type'], { box: string; text: string }> = {
  danger:  { box: 'bg-red-50 border-red-300',    text: 'text-red-800'    },
  warning: { box: 'bg-orange-50 border-orange-300', text: 'text-orange-800' },
  info:    { box: 'bg-blue-50 border-blue-300',   text: 'text-blue-800'   },
  success: { box: 'bg-green-50 border-green-300', text: 'text-green-800'  },
}

type Props = {
  items: AlertItem[]
}

export default function AlertList({ items }: Props) {
  if (items.length === 0) return null

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const s = STYLES[item.type]
        return (
          <div key={i} className={`rounded-xl p-4 border-2 ${s.box}`}>
            <p className={`text-sm leading-relaxed ${s.text}`}>{item.message}</p>
            {item.gain !== undefined && item.gain > 0 && (
              <p className={`text-sm font-semibold mt-1 ${s.text}`}>
                Gain : {item.gain.toLocaleString('fr-FR')} €
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
