<template>
  <div class="home">
    <section class="hero">
      <div class="hero__header">
        <img src="../assets/logo.png" alt="Logo" class="hero__logo">
        <div class="hero__social-icons">
          <i class="fab fa-linkedin"></i>
          <i class="fab fa-github"></i>
        </div>
      </div>
      <div class="hero__content">
        <h1 class="hero__heading">Designing websites / apps :: HEADING needed</h1>
        <div class="hero__contact-info">
          <p>Email: email@email.com | Phone: maybe not?</p>
        </div>
        <p class="hero__availability">Available for freelance work.</p>
        <p class="hero__description">
          hero descirption? 
        </p>
        <a href="#" class="hero__cta" @click.prevent="showModal = true">
          <span class="hero__cta-text">Contact Me</span>
          <img src="../assets/gmail-icon-logo.svg" alt="Gmail" class="hero__cta-icon">
        </a>
        <div class="hero__additional-buttons">
          <a href="#" class="hero__button">
            <span class="hero__button-text">Download Resume</span>
            <img src="../assets/cv_icon.png" alt="CV" class="hero__button-icon">
          </a>
          <a href="#" class="hero__button">
            <span class="hero__button-text">See Projects</span>
            <img src="../assets/projects_icon.png" alt="Projects" class="hero__button-icon">
          </a>
        </div>
      </div>
      <div class="hero__location-mode">
        <p>Current Location: Annecy, GMT+2</p>
        <label class="switch">
          <input type="checkbox">
          <span class="slider round"></span>
        </label>
        <span>Organize Mode</span>
      </div>
    </section>
    <ContactModal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ContactModal from '../components/ContactModal.vue';

const showModal = ref(false);
</script>

<style lang="scss" scoped>
.hero {
    text-align: center;
    padding: 2rem;
    max-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-image: url('../assets/hero.jpg'), linear-gradient(to bottom, #000000, #1a1a1a); /* Dark gradient */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.75); /* Darker overlay */
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 20px;
      position: relative;
      z-index: 2;
    }

    &__logo {
      width: 150px;
      height: auto;
    }

    &__social-icons {
      display: flex;
      gap: 15px;

      i {
        font-size: 1.5rem;
        color: #f0f0f0; /* White social icons */
        cursor: pointer;
        transition: color 0.3s ease;

        &:hover {
          color: #28de67; /* Green hover effect */
        }
      }
    }

    &__content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1;
      max-width: 800px;
      margin: 0 auto;
    }

    &__heading {
      font-size: 3.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      line-height: 1.2;
      color: #ffffff; /* White heading */

      @media (max-width: 768px) {
        font-size: 2.5rem;
      }
    }

    &__contact-info {
      font-size: 1.1rem;
      color: #bfbfbf; /* Light gray for contact info */
      margin-bottom: 0.5rem;
    }

    &__availability {
      font-size: 1.1rem;
      color: #28de67; /* Green for availability status */
      margin-bottom: 1rem;
    }

    &__description {
      font-size: 1.3rem;
      margin-bottom: 2rem;
      color: #d3d3d3; /* Light gray for description */

      @media (max-width: 768px) {
        font-size: 1.1rem;
      }
    }

    &__cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 2rem;
      background-color: #ffffff;
      color: #000000;
      text-decoration: none;
      border-radius: 25px;
      font-size: 1.2rem;
      font-weight: bold;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      position: relative;
      width: 180px;

      &:hover {
        background-color: #1ebd53;
        color: #ffffff;
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);

        .hero__cta-text {
          transform: translateX(-15px);
        }
      }

      &-text {
        transition: transform 0.3s ease;
      }

      &-icon {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 50px;
        opacity: 0;
        transform: translateX(10px);
        transition: all 0.3s ease;
      }

      &:hover &-icon {
        opacity: 1;
        transform: translateX(0);
      }

      @media (max-width: 768px) {
        font-size: 1.1rem;
        padding: 0.8rem 1.5rem;
        width: 160px;
      }
    }

    &__additional-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;
      width: 100%;

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
      }
    }

    &__button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.8rem 1.5rem;
      background-color: #ffffff;
      color: #000000;
      text-decoration: none;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: bold;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 180px;
      position: relative;
      overflow: hidden;

      &:hover {
        background-color: #1ebd53;
        color: #ffffff;
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);

        .hero__button-text {
          transform: translateX(-15px);
        }

        .hero__button-icon {
          opacity: 1;
          transform: translateX(0);
        }
      }

      &-text {
        transition: transform 0.3s ease;
      }

      &-icon {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 20px;
        opacity: 0;
        transform: translateX(10px);
        transition: all 0.3s ease;
      }

      @media (max-width: 768px) {
        width: 100%;
        max-width: 200px;
        margin-bottom: 0.5rem;
      }
    }

    &__location-mode {
      position: absolute;
      bottom: 20px;
      right: 20px;
      z-index: 2;
      color: #ffffff; /* White for location and toggle text */
      text-align: right;

      p {
        margin-bottom: 5px;
      }
    }

    @media (max-width: 768px) {
      &__header {
        flex-direction: column;
        align-items: flex-start;
      }

      &__logo {
        margin-bottom: 1rem;
      }

      &__social-icons {
        align-self: flex-end;
      }

      &__location-mode {
        position: static;
        margin-top: 2rem;
        text-align: center;
      }
    }
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-right: 10px;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #d3d3d3; /* Gray background */
      transition: .4s;
      border-radius: 34px;

      &:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: #ffffff; /* White toggle button */
        transition: .4s;
        border-radius: 50%;
      }
    }

    input:checked + .slider {
      background-color: #28de67; /* Green when toggle is ON */
    }

    input:checked + .slider:before {
      transform: translateX(26px);
    }
  }
  </style>
