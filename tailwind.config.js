/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: 'rgba(var(--color-background), <alpha-value>)',
        surface: 'rgba(var(--color-surface), <alpha-value>)',
        surfaceHighlight: 'rgba(var(--color-surface-highlight), <alpha-value>)',
        border: 'rgba(var(--color-border), <alpha-value>)',
        primary: 'rgba(var(--color-primary), <alpha-value>)',
        secondary: 'rgba(var(--color-secondary), <alpha-value>)',
        accent: 'rgba(var(--color-accent), <alpha-value>)',
        btnText: 'rgba(var(--color-btn-text), <alpha-value>)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
