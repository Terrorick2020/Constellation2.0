// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

export default defineNuxtConfig({
  compatibilityDate: '2025-03-15',
  
  devtools: { enabled: true },
  
  typescript: {
    typeCheck: false
  },

  modules: [
    '@element-plus/nuxt',
    'nuxt-svgo',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-viewport',
    '@nuxtjs/i18n',
  ],

  i18n: {
    lazy: true,
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'be', name: 'Белорусский', file: 'be.json' }
    ],
    defaultLocale: 'ru',
    langDir: 'locales',
    // vueI18n: './i18n.config.ts',
    vueI18n: join(__dirname, 'i18n.config.ts'),
  },

  plugins: [
    { src: '~/plugins/socket.client.ts', mode: 'client' },
  ],
  

  svgo: {
    autoImportPath: './assets/icons/'
  },

  css: [
    '~/assets/scss/index.scss',
    '~/assets/scss/app.scss',
    '~/assets/scss/auth.scss',
    '~/assets/scss/block.scss',
    '~/assets/scss/offer.scss'
  ],

  experimental: {
    payloadExtraction: false
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue: 16,
        propList: [
          '*',
          'padding',
          'margin',
          'font-size',
          'width',
          'height',
          'max-width',
          'min-width'
        ],
        unitPrecision: 5,
        minPixelValue: 2,
        replace: true,
        mediaQuery: true,
        selectorBlackList: [],
        paddingToEm: true
      }
    }
  },

  elementPlus: {
    importStyle: 'scss'
  },

  viewport: {
    breakpoints: {
      desktop: 1024,
      desktopMedium: 1280,
      desktopWide: 1600,

      mobile: 320,
      mobileMedium: 375,
      mobileWide: 425,

      tablet: 768
    },

    defaultBreakpoints: {
      desktop: 'desktop',
      mobile: 'mobile',
      tablet: 'tablet'
    },

    fallbackBreakpoint: 'desktop',

    feature: 'minWidth'
  },

  googleFonts: {
    families: {
      Manrope: { wght: [200, 300, 400, 500, 600, 700, 800] }
    },
    download: true,
    inject: true,
    display: 'swap'
  },
  vite: {
    build: {
      sourcemap: false,  
    }
  }

  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         // Добавляем путь к папке со SCSS-частями
  //         additionalData: `@use "sass:math";`, // если используется math, иначе удали
  //         importer: undefined, // сбрасываем, если был
  //         // Главное — includePaths как массив строк:
  //         includePaths: ['assets/scss']
  //       }
  //     }
  //   }
  // }




})


