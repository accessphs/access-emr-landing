/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        borderPrimary: "#f5f5f5",
        boxBorder: "#999999",
        primary: "#A79A46",
        brand: "#243D20",
      },
    },
  },
  plugins: [],
};
