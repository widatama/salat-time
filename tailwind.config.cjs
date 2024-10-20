/* eslint-env node */
 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue,ts}'],
  mode: 'jit',
  prefix: 'tw-',
  theme: {
    colors: {
      black: '#333333',
      white: '#ffffff',
    },
    screens: {
      sm: '1px',
      md: '700px',
      lg: '1100px',
    },
  },
};
