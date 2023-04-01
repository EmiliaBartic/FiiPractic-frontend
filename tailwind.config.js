/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    minWidth : {
      'twentyFiveVw': '25vw',
      '250px': '250px',
      'twentyVw' : '20vw'
    },
    screens:{
      sm:'480px',
      md:'768px',
      lg:'976px',
      xl:'1440px'
    },
    extend: {
      colors: {
        'green': '#00802B',
        'lightGreen': '#75f0aa',
        'lightPink': '#DFC2F2', 
        'blush': '#E54F6D',
        'azure': '#357DED',
        'lightAzure': '#8ab3f5',
        'black': '#161925',
        'gray' : '#D9D8D4',
        'lightBlue' : '#e7f3fd',
        'danger' : '	#DC3545'
      },
      backgroundImage: {
        'guestBackground': "url('/src/images/backgroundGuest.jpg')"
      }
    },
  },
  plugins: [],
}
