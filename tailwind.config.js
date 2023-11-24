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
    extend: {
      colors: {      
        'mypink': '#BD365D',
        'myblue': '#2a55bf',
        'mypurple': '#8278DA',
        'mygreen': '#09792c',
        'myorange': '#6886C5',
        'earthybrown': '#443e27',
        'deepred': '#442727',
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
        'buttonblue': '#6886C5',
        'button2': '#556B2F',
      },
      backgroundImage: {
        pattern:
         "url('https://images.freeimages.com/365/images/previews/b0c/icon-pattern-backgrounds-53906.jpg')",
      },
    },
  },
  plugins: [],
};

