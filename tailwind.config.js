/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:
    {
      fontFamily: {
        'matchup-pro': ['matchup-pro', 'sans-serif'],
        'futile-pro': ['futile-pro', 'sans-serif'],
        'ex-pro': ['ex-pro', 'sans-serif'],
        'eq-pro': ['eq-pro', 'sans-serif'],
        'compaq-pro': ['compaq-pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
