/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#171717",
        secondary: "#272727",
        // box shadows
        background: "#161538",
        "chat-bg": "#E8E8E8",
        "myChat-bg": "#F8F8F8",
        "chat-hover": "#38B2AC",
        "dark-subtle": "rgba(255, 255, 255, 0.5)",
        "dark-purple": "#081A51",
        "light-subtle": "rgba(39, 39, 39, 0.5)",
        "light-white": "rgba(255, 255, 255, 0.17)",
        "highlight-dark": "#ffc200",
        "single-color": "#111",
        "single-rgb": "rgba(37, 37, 37, 0.61)",
        highlight: "#058bfb",
        borderColor: "#808080",
      },

      boxShadow: {
        "light-card":
          "12px 12px 16px 0 rgba(255, 255, 255, 0.3), -8px -8px 12px 0 rgba(0, 0, 0, .25)",
        "light-button":
          "6px 6px 8px 0 rgba(255, 255, 255, 0.3), -4px -4px 6px 0 rgba(0, 0, 0, .25)",
      },
      backgroundImage: {
        "hero-pattern": "url('../public/contact.png')",
        "footer-texture": "url('/img/footer-texture.png')",
        "single-background": "url('../public/single-bg.jpg')",
        // "background-image": linear-gradient(
        //   180deg)
        // transparent,
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "960px",
      // => @media (min-width: 960px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
      xs: "376px ",
      ...defaultTheme.screens,
    },
  },
  variants: {
    display: ["responsive", "group-hover", "group-focus"],
  },
  plugins: [],
};
