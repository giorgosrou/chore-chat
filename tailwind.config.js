/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'mainbackground': '#4169E1',
      'white': '#fff',
      'black': '#000',
      'salmon': '#fa8072',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'mypink': '#BD365D',
      'myblue': '#2a55bf',
      'mypurple': '#8278DA',
      'mygreen': '#09792c'

    },
    extend: {},
  },
  plugins: [],
}

