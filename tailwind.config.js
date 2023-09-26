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
      white: '#FFF'
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
