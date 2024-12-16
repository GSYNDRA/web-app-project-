/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rufina: ["Rufina", "serif"],
        greatvibes: ["Great Vibes", "cursive"],
      },
    },
  },
  plugins: [],
};
