/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        main: '#f4f4f4',
        'blue-man': '#3D5AD2',
        'orange-woman': '#FF6C46',
        'tag-dark': '#0000000a',
        'main-border': '#0000001A',
        link: '#3D5AD2',
        'light-gray': '#F4F4F4'
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(90deg, #ff6c46 0%, #e44820 100%)'
      },
      fontFamily: {
        sans: ['Manrope', 'sans']
      }
    }
  },
  plugins: []
}
