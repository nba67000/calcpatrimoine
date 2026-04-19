// tailwind.config.ts - CalcPatrimoine Custom Theme
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette CalcPatrimoine - Confiance bancaire moderne
        primary: {
          50: '#E8EEF5',
          100: '#D1DDE9',
          200: '#A3BBD3',
          300: '#7599BD',
          400: '#4777A7',
          500: '#2E5A8F',
          600: '#2E4A6F',  // Bleu marine principal
          700: '#1E3A5F',  // Bleu marine foncé
          800: '#1A2F4F',
          900: '#0A2540',  // Bleu marine profond
        },
        accent: {
          100: '#F5EFE0',
          200: '#EBE0C1',
          300: '#E5C77F',
          400: '#D4AF37',
          500: '#B8860B',
          600: '#9A7209',
          700: '#7C5E07',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Success = MÊME bleu primary (on unifie)
        success: {
          50: '#E8EEF5',
          100: '#D1DDE9',
          200: '#A3BBD3',
          300: '#7599BD',
          400: '#4777A7',
          500: '#2E5A8F',
          600: '#2E4A6F',
          700: '#1E3A5F',
          800: '#1A2F4F',
          900: '#0A2540',
        },
        // Warning = gardé pour disclaimers (orange/ambre)
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Error = MÊME bleu primary (on unifie)
        error: {
          50: '#E8EEF5',
          100: '#D1DDE9',
          200: '#A3BBD3',
          500: '#2E5A8F',
          600: '#2E4A6F',
          700: '#1E3A5F',
          800: '#1A2F4F',
          900: '#0A2540',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['Roboto Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'result': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 20px 25px -5px rgba(184, 134, 11, 0.1), 0 10px 10px -5px rgba(184, 134, 11, 0.04)',
      },
      borderRadius: {
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

export default config
