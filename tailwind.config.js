/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens:{
      'mo':{max :'450px'},
      'ta':{max:"1000px"},
    }
  },
  plugins: [],
}

