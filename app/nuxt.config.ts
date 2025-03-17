import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    'nuxt-svgo',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  svgo: {
    autoImportPath: '~/assets/icons/'
  },
  googleFonts: {
    families: {
      Manrope: { wght: [100, 200, 300, 400, 500, 600, 700, 800, 900] }
    },
    download: true,
    inject: true,
    display: 'swap'
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: [
    '~/public/main.css',
    '~/assets/scss/index.scss',
    '~/assets/scss/global.scss',
  ],
})