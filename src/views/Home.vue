<template>
  <div class="home">
    <section class="hero">
      <div class="hero__header">
        <img src="../assets/logo.png" alt="Logo" class="hero__logo">
        <div class="hero__social-icons">
          <a href="https://www.linkedin.com/in/irilias/" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/irilias" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github"></i>
          </a>
          <div class="hero__language-switcher">
            <span @click="setLanguage('EN')" :class="{ active: currentLanguage === 'EN' }">EN</span>
            <span>|</span>
            <span @click="setLanguage('FR')" :class="{ active: currentLanguage === 'FR' }">FR</span>
          </div>
        </div>
      </div>
      <div class="hero__content">
        <h1 class="hero__heading">{{ languageContent[currentLanguage].heading }}</h1>
        <div class="hero__contact-info">
          <p>Email: irilias@gmail.com</p>
        </div>
        <p class="hero__availability">{{ languageContent[currentLanguage].availableForWork }}</p>
        <p class="hero__description">
          {{ languageContent[currentLanguage].description }} 
        </p>
        <p class="hero__description">
          {{ languageContent[currentLanguage].description_hook }} 
        </p>
        <a href="#" class="hero__cta" @click.prevent="showModal = true">
          <span class="hero__cta-text">{{ languageContent[currentLanguage].contactButton }}</span>
          <img src="../assets/gmail-icon-logo.svg" alt="Gmail" class="hero__cta-icon">
        </a>
        <div class="hero__additional-buttons">
          <a href="#" class="hero__button" @click.prevent="downloadResume">
            <span class="hero__button-text">{{ languageContent[currentLanguage].downloadResumeButton }}</span>
            <img src="../assets/cv_icon.png" alt="CV" class="hero__button-icon">
          </a>
          <a href="#" class="hero__button" @click.prevent="showProjects = true">
            <span class="hero__button-text">{{ languageContent[currentLanguage].seeProjectsButton }}</span>
            <img src="../assets/projects_icon.png" alt="Projects" class="hero__button-icon">
          </a>
          <ProjectCarousel v-if="showProjects"  @close="showProjects = false" :currentLanguage="currentLanguage" />
        </div>
      </div>
      <div class="hero__location-mode">
        <p>{{ languageContent[currentLanguage].currentLocation }}</p>
        <label class="switch">
          <input type="checkbox" disabled>
          <span class="slider round"></span>
        </label>
        <span class="developer-mode-text">{{ languageContent[currentLanguage].developerMode }}</span>
      </div>
    </section>
    <ContactModal v-if="showModal" @close="showModal = false" :currentLanguage="currentLanguage" />
    <ToastNotification 
      :show="showToast" 
      :message="toastMessage" 
      :type="toastType" 
      @close="showToast = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { error } from '../utils/logger';
import ContactModal from '../components/ContactModal.vue';
import ProjectCarousel from '../components/ProjectCarousel.vue';
import ToastNotification from '../components/ToastNotification.vue';

const showModal = ref(false);
const showProjects = ref(false);
const resumeFilename = ref(import.meta.env.VITE_RESUME_FILENAME);
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('error');

const languageContent = ref({
  EN: {
    heading: "Full Stack Solutions Tailored to Your Business Needs",
    description: "I'm a Full Stack Developer with expertise in .NET, Vue.js, and Azure. With 7 years of experience across various industries, I specialize in building scalable, high-performance applications.",
    description_hook:" Let's talk about your next project.",
    contactButton: "Contact Me",
    downloadResumeButton: "Download Resume",
    seeProjectsButton: "See Projects",
    availableForWork: "Available for freelance and permanent positions.",
    currentLocation: "Current Location: Annecy, GMT+2",
    developerMode: "Developer Mode",
    resumeDownloadError: "Failed to download resume. Please try again later.",
  },
  FR: {
    heading: "Solutions Full Stack Adaptées à Vos Besoins Métiers",
    description: "Je suis développeur Full Stack spécialisé en .NET, Vue.js et Azure. Fort de 7 ans d'expérience dans divers secteurs, je me concentre sur la création d'applications performantes et évolutives.",
    description_hook:"Discutons de votre prochain projet.",
    contactButton: "Me Contacter",
    downloadResumeButton: "Télécharger le CV",
    seeProjectsButton: "Voir mes Projets",
    availableForWork: "Disponible pour des missions freelance ou des postes en CDI.",
    currentLocation: "Localisation Actuelle : Annecy, GMT+2",
    developerMode: "Mode Développeur",
    resumeDownloadError: "Échec du téléchargement du CV. Veuillez réessayer plus tard.",
  }
});
const setLanguage = (lang) => {
  currentLanguage.value = lang;
  localStorage.setItem('language', lang);
};

const currentLanguage = ref(localStorage.getItem('language') || 'EN');

localStorage.setItem('language', currentLanguage.value);

const downloadResume = async () => {
  try {
    const response = await fetch(`/resumes/${resumeFilename.value}`);
    if (!response.ok) {
      throw new Error('Resume file not found');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = resumeFilename.value;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    error('Error downloading resume:', err);
    toastMessage.value = languageContent.value[currentLanguage].resumeDownloadError;
    toastType.value = 'error';
    showToast.value = true;
  }
};

</script>

<style lang="scss" scoped>
@import '../styles/Home.scss';
</style>
