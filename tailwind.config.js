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
        blue: {
          primary400: '#1E3A8A',
          primary300: '#2563EB',
          primary250: '#3B82F6',
          primary150: '#60A5FA',
          primary100: '#BFDBFE',
          primary50: '#EFF6FF',
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
          grey400: '#374151',
          grey300: '#6B7280',
          grey200: '#9CA3AF',
          grey150: '#D1D5DB',
          grey100: '#E5E7EB',
          grey50: '#F9FAFB',
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