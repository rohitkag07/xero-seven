/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        dmsans: ['"DM Sans"', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
        archivo: ['"Archivo Black"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        jetbrains: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#09090b', // Zinc-950, softer than pure black #000
          50: '#18181b',  // Zinc-900
          100: '#27272a', // Zinc-800
          200: '#3f3f46', // Zinc-700
          300: '#52525b', // Zinc-600
          400: '#71717a', // Zinc-500
        },
        accent: {
          DEFAULT: '#047857', // Muted, professional emerald (Tailwind emerald-700)
          light: '#059669',   // Emerald-600
          dark: '#064e3b',    // Emerald-900
          focus: '#10b981',   // Brighter emerald strictly for small interactive states
          muted: '#064e3b40', // Very subtle tint
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
