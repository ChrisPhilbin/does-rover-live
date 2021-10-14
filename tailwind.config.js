module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"], //remove unused styles in production
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "search-background": "url('/img/search-background.jpeg')",
      },
      fontFamily: {
        title: ["Montserrat"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
