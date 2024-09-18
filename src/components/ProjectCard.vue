<template>
  <div class="project-card">
    <button class="project-card__close-button" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @click="$emit('close')"></button>
    <div class="project-card__content">
      <div class="project-card__image-container">
        <img :srcset="project.image" 
             sizes="(max-width: 768px) 100vw, 50vw"
             :src="getDefaultImage(project.image)"
             :alt="project.title" 
             class="project-card__image">
        <h2 class="project-card__title">{{ project.title }}</h2>
      </div>
      <div class="project-card__details">
        <p class="project-card__description">{{ project.description }}</p>
        <div class="project-card__tags">
          <span v-for="(tag, index) in project.tags" :key="index" class="project-card__tag">{{ tag }}</span>
        </div>
      </div>
      <div class="project-card__buttons">
        <a v-if="project.status !== 'confidential' && project.status !== 'in-progress'" 
           :href="project.liveDemo" 
           target="_blank" 
           class="project-card__button" 
           @touchstart="handleTouchStart"
           @touchend="handleTouchEnd">
          <span>{{ t('common.demo') }}</span>
          <img src="../assets/demo_icon.png" alt="Demo" class="project-card__button-icon">
        </a>
        <a v-if="project.status !== 'confidential' && project.status !== 'in-progress'" 
           :href="project.repository" 
           target="_blank" 
           class="project-card__button" 
           @touchstart="handleTouchStart"
           @touchend="handleTouchEnd">
          <span>{{ t('common.repository') }}</span>
          <img src="../assets/repository_icon.png" alt="Repository" class="project-card__button-icon">
        </a>
        <div v-if="project.status === 'confidential' || project.status === 'in-progress'" :class="['project-card__status-message', { 'in-progress': project.status === 'in-progress' }]">
          <img :src="getStatusIcon(project.status)" :alt="project.status" class="project-card__status-icon">
          <p>{{ getStatusMessage(project.status) }}</p>
        </div>
      </div>
    </div>
  </div></template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


const props = defineProps({
  project: { type: Object, required: true }
});
const emit = defineEmits(['close']);


const getDefaultImage = (srcset) => {
  const images = srcset.split(', ');
  const defaultImage = images.find(img => img.includes('1024w'));
  return defaultImage ? defaultImage.split(' ')[0] : images[0].split(' ')[0];
};

const handleTouchStart = (event) => {
  event.target.classList.add('button-active');
};

const handleTouchEnd = (event) => {
  event.target.classList.remove('button-active');
};

const getStatusIcon = (status) => {
  return status === 'confidential' 
    ? new URL('../assets/confidential_icon.png', import.meta.url).href
    : new URL('../assets/work-in-progress_icon.png', import.meta.url).href;
};


const getStatusMessage = (status) => {
  return status === 'confidential' ? t('common.confidentialMessage') : t('common.inProgressMessage');
};

</script>

<style lang="scss" scoped>
@import '../styles/ProjectCard.scss' ;
</style>
