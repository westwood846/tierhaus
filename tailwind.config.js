const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: {
        low: colors.blue[700],
        DEFAULT: colors.blue[500],
        high: colors.blue[300],
      },
      background: {
        low: colors.stone[100],
        DEFAULT: '#FFFFFF',
        high: '#FFFFFF',
      },
      divider: colors.stone[200],
    },
    fontFamily: {
      sans: ['Inter'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}