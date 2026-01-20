/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#faf7f0",
          100: "#f2eadb",
          200: "#e8dac2",
          300: "#d6c3a1",
          400: "#bda57a",
          500: "#a38659",
          600: "#8a6e47",
          700: "#6f5638",
          800: "#56412a",
          900: "#3d2f1f"
        },
        basil: {
          500: "#3e7d5b",
          600: "#2f6146"
        }
      },
      fontFamily: {
        display: ["\"Cormorant Garamond\"", "serif"],
        body: ["\"Source Sans 3\"", "sans-serif"]
      }
    }
  },
  plugins: []
};
