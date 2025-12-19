/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("tailwindcss-animate")],
  theme: {
  	extend: {
  		colors: {
  			blue: {
  				primary400: '#1E3A8A',
  				primary300: '#0D47A1',
  				primary250: '#2372EC',
  				primary150: '#96BFFF',
  				primary100: '#BFDBFE',
  				primary50: '#F8FAFF'
  			},
  			error: {
  				'50': '#FEE2E2',
  				'200': '#F87171',
  				'400': '#DC2626'
  			},
  			success: {
  				'100': '#DCFCE7',
  				'200': '#4ADE80',
  				'300': '#22C55E',
  				'400': '#16A34A'
  			},
  			monochrom: {
  				white: '#FFFFFF'
  			},
  			secondary: {
  				grey400: '#424242',
  				grey300: '#626060',
  				grey200: '#8E8E8E',
  				grey150: '#D1D5DB',
  				grey100: '#D6D6D6',
  				grey50: '#F9F9F9',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			warning: {
  				'50': '#FFF7ED',
  				'400': '#F59E42'
  			},
  			warning2: {
  				'50': '#FFFBEB',
  				'400': '#FBBF24'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
}