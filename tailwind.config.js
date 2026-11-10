/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Practo for Animals visual identity: Deep emerald/teal, warm cream, alert amber
        pet: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          teal: '#0F766E',
          darkTeal: '#042F2E',
          amber: '#F59E0B',
          emergency: '#E11D48',
          sand: '#FAF8F5',
          cream: '#F4EFEA',
        },
        // AI Course visual identity: Obsidian, electric indigo, cyber cyan
        ai: {
          bg: '#0A0D14',
          card: '#111726',
          cardHover: '#182035',
          border: '#1F293D',
          primary: '#6366F1',
          accent: '#06B6D4',
          emerald: '#10B981',
          slate: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cabinet Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(99, 102, 241, 0.4)',
        'glow-teal': '0 0 25px -5px rgba(15, 118, 110, 0.4)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}

