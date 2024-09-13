<template>
  <div class="project-card">
    <button class="project-card__close-button" ref="closeButton" @click="$emit('close')"></button>
    <div class="project-card__content">
      <div class="project-card__image-container">
        <img :src="project.image" :alt="project.title[currentLanguage]" class="project-card__image">
        <h2 class="project-card__title">{{ project.title[currentLanguage] }}</h2>
      </div>
      <div class="project-card__details">
        <p class="project-card__description">{{ project.description[currentLanguage] }}</p>
        <div class="project-card__tags">
          <span v-for="(tag, index) in project.tags" :key="index" class="project-card__tag">{{ tag }}</span>
        </div>
      </div>
      <div class="project-card__buttons">
        <a :href="project.liveDemo" target="_blank" class="project-card__button" ref="demoButton">
          <span>{{ languageContent[currentLanguage].demo }}</span>
          <img src="../assets/demo_icon.png" alt="Demo" class="project-card__button-icon">
        </a>
        <a :href="project.repository" target="_blank" class="project-card__button" ref="repoButton">
          <span>{{ languageContent[currentLanguage].repository }}</span>
          <img src="../assets/repository_icon.png" alt="Repository" class="project-card__button-icon">
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { addTouchListeners } from '../utils/touchListeners';

const props = defineProps({
  project: { type: Object, required: true },
  currentLanguage: { type: String, required: true },
  languageContent: { type: Object, required: true }
});


const closeButton = ref(null);
const demoButton = ref(null);
const repoButton = ref(null);

onMounted(() => {
  [closeButton.value, demoButton.value, repoButton.value].forEach(button => addTouchListeners(button, 'button-active'));
});

</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';
.project-card {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 80vh;
  background-color: $background-color;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  &__close-button {
    position: absolute;
    top: 1%;
    right: 10px;
    width:  clamp(20px, 5vw, 50px);
    height:  clamp(20px, 5vw, 50px);
    font-size: clamp(12px, 2vw, 22px);
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 8px;
    color: $primary-color;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
    line-height: 1;
    z-index: 2;

    &::before {
      content: '×';
      font-weight: bold;
      transition: transform 0.3s ease, color 0.3s ease;
    }

    &:hover, &.button-active {
      background-color: rgba(0, 0, 0, 0.7);

      &::before {
        color: red;
        transform: rotate(90deg) scale(1.1);
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
  }

  &__image-container {
    flex: 0 0 auto;
    height: 30%;
    position: relative;
    z-index: 1;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    margin: 0;
  }

  &__details {
    // flex: 1 1 auto;
    overflow-y: auto;
    padding: 20px;
    z-index: 2;
  }
  &__description {
    margin-bottom: 15px;
    font-size: 1rem;
    line-height: 1.5;
    text-align: left;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 15px;
    margin-top: 20px;
  }

  &__tag {
    background-color: $primary-color;
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
  }

  &__buttons {
    display: flex;
    justify-content: space-evenly;
    padding: 10px 20px;
  }

  &__button {
    @include transition-all;
    background-color:white ;
    color: $primary-color;
    padding: 10px 20px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    overflow: hidden;
    position: relative;
    border: 1px solid $primary-color;
    width: 150px;
    height: 25px;
    span {
      transition: transform 0.3s ease;
      white-space: nowrap;
    }

    img {
      width: 24px;
      height: 24px;
      position: absolute;
      right: 5px;
      opacity: 0;
      transform: translateX(10px);
      @include transition-all;
    }
    &:hover, &.button-active {
      background-color: darken($primary-color, 10%);
      color: white;
      @include button-hover;
      span {
        transform: translateX(-15px);
      }

      img {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }

  @media (max-width: 320px) {
  }
  @media (max-width: 375px) {
    
  }
  @media (max-width: 414px) {
    &__buttons {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  &__button {
    width: 50%;
    height: 50%;
    max-width: 200px;
    height: auto;
    padding: 10px;
    
    span {
      display: inline;
      font-size: 0.9rem;
    }

    img {
      position: static;
      opacity: 0;
      transform: none;
      margin-left: 5px;
      width: 20px;
      height: 20px;
      transition: transform 0.3s ease;
      transform: translateX(10px);
    }
    &:hover, &.button-active {
      img {
        opacity: 1;
        transform: scale(1.1);
        transform: translateX(0);
      }
    }
  }
  }
  @media (max-width: 768px) {
    &__title {
      font-size: 1.2rem;
    }

    &__description {
      font-size: 0.9rem;
    }

    &__tag {
      font-size: 0.7rem;
    }
    &__tags {
      margin: 20px;
    }
   
  }
  @media (max-width: 1024px) {
  }
  @media (max-width: 1280px) {
  }
  @media (max-width: 1440px) {
  }
  @media (max-width: 1920px) {
  }
  @media (max-width: 2560px) {
  }
  
}
</style>
