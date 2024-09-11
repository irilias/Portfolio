
<template>
  <div class="home">
    <div class="home__content">
      <header class="header">
      <img src="../assets/logo.png" alt="Logo" class="header__logo">
      <div class="header__right">
        <div class="header__social-icons">
          <a href="https://www.linkedin.com/in/irilias/" target="_blank" rel="noopener noreferrer" ref="linkedinIcon">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/irilias" target="_blank" rel="noopener noreferrer" ref="githubIcon">
            <i class="fab fa-github"></i>
          </a>
        </div>
        <div class="header__language-switcher">
          <span @click="setLanguage('EN')" :class="{ active: currentLanguage === 'EN' }" ref="enLang">EN</span>
          <span>|</span>
          <span @click="setLanguage('FR')" :class="{ active: currentLanguage === 'FR' }" ref="frLang">FR</span>
        </div>
      </div>
      </header>

    <main class="main">
      <h1 class="main__heading">Full Stack solutions tailored to your business</h1>
      <p class="main__description">
        I'm a full stack developer specializing in .NET, Vue.js, and Azure. With 7 years of experience across various industries, I collaborate on developing efficient and reliable applications that can scale with the needs of the business.
      </p>
      <p class="main__availability">Open to freelance and full-time opportunities.</p>
      <div class="main__cta">
        <button class="main__cta-primary" ref="primaryButton" @click="showModal = true">
          <span>Get in Touch</span>
          <img src="../assets/gmail-icon-logo.svg" alt="Gmail" class="main__cta-icon">
        </button>
        <div class="main__cta-secondary">
          <button ref="resumeButton">
            <span>Download my resume</span>
            <img src="../assets/cv_icon.png" alt="CV" class="main__button-icon">
          </button>
          <button ref="projectsButton"  @click="showProjects = true">
            <span>View my projects</span>
            <img src="../assets/projects_icon.png" alt="Projects" class="main__button-icon">
          </button>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p class="footer__location">Currently in Annecy, GMT+2</p>
      <div class="footer__mode">
        <label class="switch">
          <input type="checkbox" disabled>
          <span class="slider round"></span>
        </label>
        <span>Developer Mode</span>
      </div>
    </footer>
    </div>
  </div>
  <ContactModal v-if="showModal" @close="showModal = false" :currentLanguage="currentLanguage" />
  <ProjectCarousel v-if="showProjects" @close="showProjects = false" :currentLanguage="currentLanguage" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ContactModal from '../components/ContactModal.vue';
import ProjectCarousel from '../components/ProjectCarousel.vue';

const currentLanguage = ref('EN');
const showModal = ref(false);
const showProjects = ref(false);

const setLanguage = (lang) => {
  currentLanguage.value = lang;
};

const primaryButton = ref(null);
const resumeButton = ref(null);
const projectsButton = ref(null);
const linkedinIcon = ref(null);
const githubIcon = ref(null);
const enLang = ref(null);
const frLang = ref(null);

const addTouchListeners = (element, activeClass = 'touch-active') => {
  element.addEventListener('touchstart', () => {
    element.classList.add(activeClass);
    setTimeout(() => {
      element.classList.remove(activeClass);
    }, 300);
  });
};


onMounted(() => {
  [primaryButton.value, resumeButton.value, projectsButton.value].forEach(button => addTouchListeners(button, 'button-active'));
  [linkedinIcon.value, githubIcon.value, enLang.value, frLang.value].forEach(element => addTouchListeners(element));
});

</script>

<style lang="scss" scoped>
@import '../styles/Home.scss';
</style>