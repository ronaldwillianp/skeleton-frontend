/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  prefix: 'tw-',
  theme: {
    colors: {
      heroBg: '#D7F5DC',
      primary: '#20B15A',
      hoverPrimary: '#219F53',
      primaryClaro: '#D7F5DC',
      black: '#130F26',
      white: '#FFF',
      blue: '#3b82f6',
      gray: '#4b5563',
      gray50: '#f9fafb',
      gray100: '#f3f4f6',
      gray200: '#e5e7eb',
      gray500: '#6b7280',
      gray600: '#4b5563',
      gray900: '#111827',
    },
    extend: {
      animation: {
        wiggle: 'wiggle 10s linear infinite'
      },
      keyframes: {
        wiggle: {
          "0%": {
            transform: "translateX(100%)"
          },
          "100%": {
            transform: "translateX(-100%)"
          }
        }
      }
    },
  },
  plugins: [],
}
