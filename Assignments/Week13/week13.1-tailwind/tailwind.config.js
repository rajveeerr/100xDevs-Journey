/** @type {import('tailwindcss').Config} */
export default {
  content: [//this basically sets where we are going to write the frontend code/where are we going to used tailwind
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",//this gets tricky when using monorepos
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}