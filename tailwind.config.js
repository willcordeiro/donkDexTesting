/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppin: ['Poppins', 'sans-serif']
      },
      colors: {
        pink100: 'hsl(22, 24%, 93%)',
        pink900: '#736666',
        orange500: 'hsl(22, 100%, 65%)',
        orange900: 'hsl(41, 80%, 47%)',

        dark300: 'hsl(235, 20%, 23%)',
        dark400: 'hsl(236, 19%, 15%)',
        dark500: 'hsl(240, 19%, 12%)',
        dark700: 'hsl(234, 18%, 34%)',
        dark900: '#9B9BB0',
        darkHover: 'hsl(234, 18%, 34%)',
        darkText: 'hsl(231, 50%, 92%)',

        black500: 'hsl(228, 9%, 11%)'
      }
    }
  },
  plugins: []
}
