import { defineI18nConfig } from '#i18n'; 

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  bundle: {
      optimizeTranslationDirective: false  
    }
}))



