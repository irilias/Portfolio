
<template>
  <div class="home">
    <div class="home__content">
      <header class="header">
      <img src="../assets/logo.png" alt="Logo" class="header__logo">
      <div class="header__right">
        <div class="header__social-icons">
          <a href="https://www.linkedin.com/in/irilias/" target="_blank" rel="noopener noreferrer" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/irilias" target="_blank" rel="noopener noreferrer" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
            <i class="fab fa-github"></i>
          </a>
        </div>
        <div class="header__language-switcher">
          <span @touchstart="handleTouchStart" @touchend="handleTouchEnd" @click="setLanguage('EN')" :class="{ active: currentLanguage === 'EN' }">EN</span>
          <span>|</span>
          <span @touchstart="handleTouchStart" @touchend="handleTouchEnd" @click="setLanguage('FR')" :class="{ active: currentLanguage === 'FR' }">FR</span>
        </div>
      </div>
      </header>

    <main class="main">
      <h1 class="main__heading">{{ t('home.heading') }}</h1>
      <p class="main__description">
        {{ t('home.description') }}
      </p>
      <p class="main__description">
        {{ t('home.description_hook') }}
      </p>
      <p class="main__availability">{{ t('home.availableForWork') }}</p>
      <div class="main__cta">
        <button class="main__cta-primary"  @touchstart="handleTouchStart" @touchend="handleTouchEnd" @click="showModal = true">
          <span>{{ t('home.contactButton') }}</span>
          <img src="../assets/gmail-icon-logo.svg" alt="Gmail" class="main__cta-icon">
        </button>
        <div class="main__cta-secondary">
          <button @touchstart="handleTouchStart" @touchend="handleTouchEnd" @click="handleResumeDownload" >
            <span>{{ t('home.downloadResumeButton') }}</span>
            <img src="../assets/cv_icon.png" alt="CV" class="main__button-icon">
          </button>
          <button @touchstart="handleTouchStart" @touchend="handleTouchEnd" @click="showProjects = true">
            <span>{{ t('home.seeProjectsButton') }}</span>
            <img src="../assets/projects_icon.png" alt="Projects" class="main__button-icon">
          </button>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p class="footer__location">{{ t('home.currentLocation') }}</p>
      <div class="footer__mode">
        <label class="switch">
          <input type="checkbox" disabled>
          <span class="slider round"></span>
        </label>
        <span>{{ t('home.developerMode') }}</span>
      </div>
    </footer>
    </div>
  </div>
  <ContactModal v-if="showModal" @close="showModal = false" />
  <ProjectCarousel v-if="showProjects" @close="showProjects = false" />
  <ToastNotification 
    :show="showToast" 
    :message="toastMessage" 
    :type="toastType" 
    @close="showToast = false"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useLanguage } from '../composables/useLanguage'
import { useI18n } from 'vue-i18n';
import ContactModal from '../components/ContactModal.vue';
import ProjectCarousel from '../components/ProjectCarousel.vue';
import { useResumeDownload } from '../composables/useResumeDownload'
import ToastNotification from '../components/ToastNotification.vue';

const { downloadResume } = useResumeDownload()
const { currentLanguage, setLanguage } = useLanguage()
const { t } = useI18n();

const showModal = ref(false);
const showProjects = ref(false);

const handleTouchStart = (event) => {
  event.target.classList.add('button-active');
};

const handleTouchEnd = (event) => {
  event.target.classList.remove('button-active');
};

const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('error')

const handleResumeDownload = async () => {
  const result = await downloadResume(currentLanguage);
  if (!result.success) {
    showToast.value = true
    toastMessage.value = t('errors.resumeDownloadFailed')
    toastType.value = 'error'
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  }
}

</script>

<style lang="scss" scoped>
@import '../styles/Home.scss';
</style>