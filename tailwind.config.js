/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "light-gray": "#E8E9EB",
        "gray": "#D9D9D9",
        "blue": "#000066",
      }
    },
  },
  plugins: [],
}