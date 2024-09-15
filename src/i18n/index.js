import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'

export default createI18n({
  legacy: false,
  locale: 'EN',
  fallbackLocale: 'EN',
  messages: { EN: en, FR: fr }
})