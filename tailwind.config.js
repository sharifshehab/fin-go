/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: 'var(--primary-color)', 
        secondaryColor: 'var(--secondary-color)', 
        textColor: 'var(--text-color)', 
      },
      fontFamily: {
        poppins: ['Poppins', 'serif'], 
      },
      backgroundImage: {
        'aboutBG': "url('./images/bg.jpg')",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};