const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    darkMode: "class",
    plugins: [heroui()],
  }
  