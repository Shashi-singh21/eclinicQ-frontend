/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        green : { 
          primary100: '3EAF3F',
        },
        blue: {
          primary400: '#1E3A8A',
          primary300: '#0D47A1',
          primary250: '#2372EC',
          primary150: '#96BFFF',
          primary100: '#BFDBFE',
          primary50: '#F8FAFF',
        },
        error: {
          400: '#DC2626',
          200: '#F87171',
          50: '#FEE2E2',
        },
        success: {
          400: '#16A34A',
          300: '#22C55E',
          200: '#4ADE80',
          100: '#DCFCE7',
        },
        monochrom: {
          white: '#FFFFFF',
        },
        secondary: {
          grey400: '#424242',
          grey300: '#626060',
          grey200: '#8E8E8E',
          grey150: '#D1D5DB',
          grey100: '#D6D6D6',
          grey50: '#F9F9F9',
        },
        warning: {
          400: '#F59E42',
          50: '#FFF7ED',
        },
        warning2: {
          400: '#FBBF24',
          50: '#FFFBEB',
        },
      },
    },
  },
}