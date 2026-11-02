/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8F0',
          100: '#F5ECCF',
          200: '#EDDCA4',
          300: '#E4CB79',
          400: '#D5B446',
          500: '#C59A30', // Royal Champagne Gold
          600: '#A37C1E',
          700: '#816013',
          800: '#60460D',
          900: '#3F2C07',
        },
        ivory: {
          DEFAULT: '#FAF7F2',
          light: '#FDFBF7',
          dark: '#EFE7DA',
          warm: '#F7F1E5',
        },
        royal: {
          maroon: '#520B13',
          crimson: '#790E17',
          emerald: '#0D382B',
          purple: '#2A1342',
          midnight: '#140F1D',
          haldi: '#EAA21D',
          mehndi: '#184E38',
          sangeet: '#38165B',
          tilak: '#5B1118',
          varmala: '#680D1A',
          reception: '#1A1829',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        hindi: ['"Rozha One"', '"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        'royal': '0 20px 50px -12px rgba(197, 154, 48, 0.25)',
        'royal-lg': '0 30px 60px -15px rgba(26, 17, 34, 0.35)',
        'inner-gold': 'inset 0 0 25px rgba(197, 154, 48, 0.2)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 12px rgba(197, 154, 48, 0.3))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 24px rgba(197, 154, 48, 0.6))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
