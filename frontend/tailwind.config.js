/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a2942',
        secondary: '#64748b',
        background: '#f8f9fa',
        textMain: '#1f2937',
      }
    },
  },
  plugins: [],
}
