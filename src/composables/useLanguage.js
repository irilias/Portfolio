
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

export function useLanguage() {
  const { locale } = useI18n()
  const currentLanguage = ref(localStorage.getItem('language') || 'EN')
  onMounted(() => {
    locale.value = currentLanguage.value
  })
  watch(currentLanguage, (newLang) => {
    locale.value = newLang
    localStorage.setItem('language', newLang)
  })

  function setLanguage(lang) {
    currentLanguage.value = lang
  }

  return {
    currentLanguage,
    setLanguage
  }
}
