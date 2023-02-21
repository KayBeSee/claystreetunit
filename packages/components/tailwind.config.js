const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data.ts',
  ],
  theme: {
    extend: {
      colors: {
        'sicard-gold': {
          DEFAULT: '#E3BF87',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FAF4EA',
          300: '#F2E2C9',
          400: '#EBD1A8',
          500: '#E3BF87',
          600: '#D8A75A',
          700: '#CB8E2F',
          800: '#9D6E25',
          900: '#704E1A',
        },
        'sicard-blue': {
          DEFAULT: '#142635',
          50: '#A0C0DB',
          100: '#91B6D6',
          200: '#73A3CA',
          300: '#568FBF',
          400: '#417BAB',
          500: '#36668E',
          600: '#2A5070',
          700: '#1F3B53',
          800: '#142635',
          900: '#05090C',
        },
        display: ['group-hover', 'group-active'],
      },
      fontFamily: {
        serif: ['Raleway', ...defaultTheme.fontFamily.sans],
        sans: ['Roboto Slab', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
