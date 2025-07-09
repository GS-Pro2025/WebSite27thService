/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7BABAF",
        secondary: "#0E6F7E",
        customgray: "#A7C3BC",
        
      },
    },
  },
  plugins: [],
}