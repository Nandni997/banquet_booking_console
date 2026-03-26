/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B3CC4",
        gold: "#D4AF37",
        background: "#F8F9FB"
      }
    },
  },
  plugins: [],
}