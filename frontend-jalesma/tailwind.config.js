/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        jalesma: {
          gold: '#D4AF37',
          'gold-light': '#F4E4B0',
          'gold-dark': '#8B7355',
          black: '#0A0A0A',
          'gray-dark': '#2A2A2A',
          'gray-medium': '#404040',
        },
      },
    },
  },
  plugins: [],
}