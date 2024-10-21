/* eslint-env node */
 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue,ts}'],
  mode: 'jit',
  prefix: 'tw-',
  theme: {
    colors: {
      dark: '#333333',
      white: '#ffffff',
    },
    fontFamily: {
      sans: ['Lato', 'Helvetica', 'Arial', 'sans-serif'],
    },
    screens: {
      sm: '1px',
      md: '700px',
      lg: '1100px',
    },
  },
};
