
<template>
  <div class="home">
    <div class="home__content">
      <header class="header">
      <img src="../assets/logo.png" alt="Logo" class="header__logo">
      <div class="header__right">
        <div class="header__social-icons">
          <a href="https://www.linkedin.com/in/irilias/" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/irilias" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github"></i>
          </a>
        </div>
        <div class="header__language-switcher">
          <span @click="setLanguage('EN')" :class="{ active: currentLanguage === 'EN' }">EN</span>
          <span>|</span>
          <span @click="setLanguage('FR')" :class="{ active: currentLanguage === 'FR' }">FR</span>
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
        <button class="main__cta-primary">
          <span>Get in Touch</span>
          <img src="../assets/gmail-icon-logo.svg" alt="Gmail" class="main__cta-icon">
        </button>
        <div class="main__cta-secondary">
          <button>
            <span>Download my resume</span>
            <img src="../assets/cv_icon.png" alt="CV" class="main__button-icon">
          </button>
          <button>
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
</template>

<script setup>
import { ref } from 'vue';

const currentLanguage = ref('EN');

const setLanguage = (lang) => {
  currentLanguage.value = lang;
};
</script>

<style lang="scss" scoped>
@import '../styles/Home.scss';
</style>