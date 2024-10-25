/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,vue,js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      lineHeight: {
        'zero': '0',
      },
      flex: {
        'full': '0 0 100%',
        'flexible': '1 1 0',
      },
      colors: {
        discord: {
          DEFAULT: '#7289da',
          dark: '#5d70b4'
        }
      },
      fontSize: {
        'privacy-title': '60px',
        'privacy-subtitle': '30px'
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'until-lg': { 'max': '1023px' },
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: []
}
