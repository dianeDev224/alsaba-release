/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/renderer/index.html",
    "./src/renderer/src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { opacity: 0 },
          '10%': { opacity: 0.1 },
          '20%': { opacity: 0.2 },
          '30%': { opacity: 0.3 },
          '40%': { opacity: 0.4 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: false })
  ],
}

