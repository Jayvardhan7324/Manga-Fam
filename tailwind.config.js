/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#8E44AD",
        "d9-white": "#D9D9D9",
        "4B-black": "#4B4B4B",
        // "custom-gray": "#697E84",
        "custom-gray": "#a5b1c2",
        secondary_white: "#ece7e7",
        primary_black: "#1A1A1A",
        // secondary_black: "#282C2D",
        secondary_black: "#121212",

        mid_black: "#2f3640",
      },
    },
  },
  plugins: [],
}
