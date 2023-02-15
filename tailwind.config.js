/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
      },
      colors: {
        blue: "#008FFB",
        lightBlue: "#4AC5EC",
        danger: "#F63F60",
        warning: "#E59E33",
        confirm: "#17CE6B",
        darkGray: "#737380",
        gray: "#A8A8B3",
        lightGray: "#DBDCDD",
        background: "#F8F8F8",
        details: "#FEFEFE",
        text: "#393939",
      },
    },
  },
  plugins: [],
};
