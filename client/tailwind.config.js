/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}'],
  darkMode: 'class',
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      grey: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#d6d6d6',
        300: '#b8b8b8',
        400: '#999999',
        500: '#7a7a7a',
        600: '#5c5c5c',
        700: '#3d3d3d',
        800: '#1f1f1f',
      },
      blue: {
        700: '#122f68',
        600: '#1c479c',
        500: '#255fd0',
        400: '#5282e0',
        300: '#86a8ea',
        200: '#bacdf3',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
