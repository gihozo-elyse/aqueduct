/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#17335c", dark: "#102548", light: "#264878" },
        teal: { brand: "#0e8f8a" },
      },
      fontFamily: { sans: ["var(--font-ubuntu)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
