/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          bg: '#FAFAF8',
          card: '#FFFFFF',
          muted: '#F3F3EF',
          border: '#E5E5E0',
          borderDark: '#D1D1CB',
        },
        ink: {
          primary: '#18181B',
          secondary: '#52525B',
          muted: '#71717A',
          faint: '#A1A1AA',
        },
        accent: {
          DEFAULT: '#2563EB',
          subtle: '#EFF6FF',
          border: '#BFDBFE',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
