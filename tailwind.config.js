const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./help/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
    colors: {
      ...colors,
      primary: "var(--color-primary)",
      primaryOpacity: "var(--color-primary-opacity)",
      secondary: "var(--color-secondary)",
      overlay: "var(--color-overlay)",
      alert: {
        success: "var(--color-alert-success)",
        error: "var(--color-alert-error)",
      },
      facebook: "var(--color-facebook)",
      gray: {
        0: "var(--color-gray-0)",
        200: "var(--color-gray-200)",
        500: "var(--color-gray-500)",
        800: "var(--color-gray-800)",
        900: "var(--color-gray-900)",
        opacity: {
          10: "var(--color-gray-500-opacity-10)",
        },
      },
      middleScreenGradient:
        "linear-gradient(to bottom, var(--color-secondary) 0%, var(--color-yellow) 50%, var(--color-white) 50%, var(--color-white) 100% )",
      white: "var(--color-white)",
      yellow: "var(--color-yellow)",
      transparent: "rgba(0, 0, 0, 0)",
      "transparent-color": {
        gray: {
          200: "var(--transparent-gray-200)",
          800: "var(--transparent-gray-800)",
        },
      },
    },
    screens: {
      xs: "380px",
      "3xl": "1700px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
