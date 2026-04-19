// src/components/Icon.tsx
// Les 3 seules icônes autorisées sur le site (en SVG, pas emoji)

type IconName = 'check' | 'cross' | 'warning'

interface IconProps {
  name: IconName
  className?: string
  size?: number
}

export default function Icon({ name, className = '', size = 20 }: IconProps) {
  if (name === 'check') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 ${className}`}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="11" fill="#10B981" />
        <path
          d="M7 12.5L10.5 16L17 9"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (name === 'cross') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 ${className}`}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="11" fill="#DC2626" />
        <path
          d="M8 8L16 16M16 8L8 16"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (name === 'warning') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block flex-shrink-0 ${className}`}
        aria-hidden="true"
      >
        <path
          d="M12 2L23 21H1L12 2Z"
          fill="#F59E0B"
          stroke="#F59E0B"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M12 9V14"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="17.5" r="1.2" fill="white" />
      </svg>
    )
  }

  return null
}
