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
        third: "#A7C3BC",
        yellow: "#FFE67B",
        gray: "#D9D9D9",
        white : "#FFFFFF",
        black: "#000000"
      },
    },
  },
  plugins: [],
}