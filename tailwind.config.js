/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf0dc',
          200: '#bae0bd',
          300: '#8fc894',
          400: '#5eaa66',
          500: '#3d8c47',
          600: '#2c7035',
          700: '#25592c',
          800: '#204726',
          900: '#1c3c21',
          950: '#0c2111',
        },
        secondary: {
          50: '#f0f4fa',
          100: '#dde7f3',
          200: '#c2d3ea',
          300: '#9ab7dc',
          400: '#7094cb',
          500: '#4f75b8',
          600: '#3d5d9c',
          700: '#334b7f',
          800: '#2e4169',
          900: '#2a3858',
          950: '#1c243a',
        },
        gold: {
          50: '#fefbe8',
          100: '#fef5c2',
          200: '#feea88',
          300: '#fdd84b',
          400: '#fcc41d',
          500: '#efa506',
          600: '#cc7c03',
          700: '#a35705',
          800: '#86430c',
          900: '#723810',
          950: '#431c05',
        },
      },
    },
  },
  plugins: [],
}
