/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,html,js}",
    "./composables/**/*.{vue,html,js}",
    "./layouts/**/*.{vue,html,js}",
    "./pages/**/*.{vue,html,js}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      wnaNeutral900: "#02012c",
      wnaNeutral800: "#262540",
      wnaNeutral700: "#302f4a",
      wnaNeutral600: "#3c3b5e",
      wnaNeutral300: "#acacb7",
      wnaNeutral200: "#d4d3d9",
      wnaNeutral0: "#ffffff",
      blue500: "#4658d9",
      orange500: "#ff820a",
      blue700: "#2B1B9C",
    },
    extend: {
      fontFamily: {
        BricolageGrotesqueBold: ["BricolageGrotesqueBold", "sans-serif"],
        DMSansBold: ["DMSansBold", "sans-serif"],
        DMSansLight: ["DMSansLight", "sans-serif"],
        DMSansMedium: ["DMSansMedium", "sans-serif"],
        DMSansSemiBold: ["DMSansSemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
