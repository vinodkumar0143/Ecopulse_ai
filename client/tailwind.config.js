/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eco: {
          dark: "#0b130e",
          card: "#121e16",
          emerald: "#10b981",
          lightGreen: "#34d399",
          mint: "#6ee7b7",
          forest: "#064e3b",
          neon: "#00ff9d"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
