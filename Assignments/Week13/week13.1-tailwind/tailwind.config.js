/** @type {import('tailwindcss').Config} */
export default {
  content: [//this basically sets where we are going to write the frontend code/where are we going to used tailwind
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",//this gets tricky when using monorepos
  ],
  theme: {
    extend: {
      colors: {
        'mariner': {//changing/adding more colours to the tailwind
          '50': '#eef9ff',
          '100': '#d9f0ff',
          '200': '#bce6ff',
          '300': '#8ed8ff',
          '400': '#59c0ff',
          '500': '#32a3ff',
          '600': '#1c84f4',
          '700': '#156fe6',
          '800': '#1757b6',
          '900': '#194c8f',
          '950': '#142e57'
        },
        'nav': {
          "from": "#60a5fa",
          "to": "#1d4ed8"
        }
      },
      screens: {
        md: '700px',//this adjusts the desired breakpoint
        lg: '1024px'
      },
      fontFamily: {
        'inter': ['"inter"', 'serif']
      },
      fontSize: {
        'xs': '0.694rem',
        sm: '0.833rem',
        base: '1rem',
        xl: '1.2rem',
        '2xl': '1.44rem',
        '3xl': '2.074rem',
        '4xl': '2.488rem',
        '5xl': '2.986rem',
      },
      backgroundImage: {
        'hero-banner': "url('/accelerate.JPG')",
      }
    },
  },
  plugins: [],
  darkMode: 'selector'
}