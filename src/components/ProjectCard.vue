<template>
  <div class="project-card">
    <button class="project-card__close-button" ref="closeButton" @click="$emit('close')"></button>
    <div class="project-card__content">
      <div class="project-card__image-container">
        <img 
          :srcset="project.image" 
          sizes="(max-width: 768px) 100vw, 50vw"
          :src="getDefaultImage(project.image)"
          :alt="project.title[currentLanguage]" 
          class="project-card__image"
        >
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

const getDefaultImage = (srcset) => {
  const images = srcset.split(', ');
  const defaultImage = images.find(img => img.includes('1024w'));
  return defaultImage ? defaultImage.split(' ')[0] : images[0].split(' ')[0];
};
const closeButton = ref(null);
const demoButton = ref(null);
const repoButton = ref(null);

onMounted(() => {
  [closeButton.value, demoButton.value, repoButton.value].forEach(button => addTouchListeners(button, 'button-active'));
});

</script>

<style lang="scss" scoped>
@import '../styles/ProjectCard.scss' ;
</style>
