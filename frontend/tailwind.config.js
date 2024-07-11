/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        cardShadow: 'box-shadow: 0px 4px 13px 10px rgba(0,0,0,0.33);'
      }
    },
  },
  plugins: [],
}

