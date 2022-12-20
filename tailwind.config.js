const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  future: ["hoverOnlyWhenSupported", "respectDefaultRingColorOpacity"],
  experimental: ["optimizeUniversalDefaults"],
  extend: {
    fontFamily: {
      berkshireSwash: ["Berkshire Swash", ...fontFamily.sans],
      IindieFlower: ["Indie Flower", ...fontFamily.sans],
      inter: ["Inter", ...fontFamily.sans],
      playfairDisplay: ["Playfair Display", ...fontFamily.sans],
      raleway: ["Raleway", ...fontFamily.sans],
      code: ["Fira Code", ...fontFamily.mono],
      ...fontFamily
    }
  },
  plugins: []
}
