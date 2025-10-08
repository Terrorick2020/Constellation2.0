// https://nuxt.com/docs/api/configuration/nuxt-config
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
    'nuxt-viewport'
  ],

  plugins: [{ src: '~/plugins/socket.client.ts', mode: 'client' }],

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

  devServer:
    process.env.NODE_ENV === 'development'
      ? {
          port: 80,
          host: '0.0.0.0'
        }
      : undefined,

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
