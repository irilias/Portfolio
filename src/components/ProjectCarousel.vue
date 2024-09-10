<template>
  <div class="carousel-modal__overlay" @click="closeCarousel">
    <div class="carousel-modal__content" @click.stop>
      <button class="carousel-modal__close-button" @click="closeCarousel">×</button>
      <div class="carousel">
        <div
          class="carousel__wrapper"
          :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
        >
          <div
            v-for="(project, index) in projects"
            :key="index"
            :class="['carousel__slide', { 'carousel__slide--active': index === activeIndex }]"
          >
            <img :src="project.image" alt="Project Image" class="carousel__image" />
            <h2 class="carousel__title">{{ project.title[currentLanguage] }}</h2>
            <p class="carousel__description">{{ project.description[currentLanguage] }}</p>
            <div class="carousel__tags">
              <span v-for="(tag, tagIndex) in project.tags" :key="tagIndex" class="carousel__tag">{{ tag }}</span>
            </div>
            <div class="carousel__buttons">
              <a :href="project.liveDemo" target="_blank" class="carousel__button">{{ languageContent[currentLanguage].demo }}</a>
              <a :href="project.repository" target="_blank" class="carousel__button">{{ languageContent[currentLanguage].repository }}</a>
            </div>
          </div>
        </div>
        <button class="carousel__arrow carousel__arrow--left" @click="prevSlide">‹</button>
        <button class="carousel__arrow carousel__arrow--right" @click="nextSlide">›</button>
        <div class="carousel__dots">
          <span
            v-for="(project, index) in projects"
            :key="index"
            class="carousel__dot"
            :class="{ 'carousel__dot--active': index === activeIndex }"
            @click="setActive(index)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps(['currentLanguage']);


const languageContent = ref({
  EN: {
    repository: "Repository",
    demo:"Live Demo",
    descriptionProjet: "Description of Project 1",
  },
  FR: {
    repository:"Dépôt",
    demo: "Démo en Direct",
    descriptionProjet: "Description du Projet 1",
  }
});


const projects = ref([
  {
    title: {
      EN: 'Project 1',
      FR: 'Projet 1',
    },
    description: {
      EN: 'Description of Project 1: Dynamic Vue.js application to manage tasks, optimized for high performance.',
      FR: 'Description du Projet 1: Application Vue.js dynamique pour gérer des tâches, optimisée pour des performances élevées.',
    },
    image: '/project01_icon.webp',
    tags: ['Vue.js', 'JavaScript', 'CSS'],
    liveDemo: 'https://project1-demo.com',
    repository: 'https://github.com/user/project1'
  },
  {
    title: {
      EN: 'Project 2',
      FR: 'Projet 2',
    },
    description: {
      EN: 'Description of Project 2: A real-time web app built with React and MongoDB.',
      FR: 'Description du Projet 2: Une application web en temps réel construite avec React et MongoDB.',
    },
    image: '/project02_icon.webp',
    tags: ['React', 'Node.js', 'MongoDB'],
    liveDemo: 'https://project2-demo.com',
    repository: 'https://github.com/user/project2'
  },
  {
    title: {
      EN: 'Project 3',
      FR: 'Projet 3',
    },
    description: {
      EN: 'Description of Project 3: A scalable Angular app leveraging Firebase for back-end services.',
      FR: 'Description du Projet 3: Une application évolutive Angular utilisant Firebase pour les services back-end.',
    },
    image: '/project03_icon.webp',
    tags: ['Angular', 'TypeScript', 'Firebase'],
    liveDemo: 'https://project3-demo.com',
    repository: 'https://github.com/user/project3'
  },
]);

const activeIndex = ref(0);
let autoplayInterval;

const nextSlide = () => {
  stopAutoplay();
  startAutoplay();
  activeIndex.value = (activeIndex.value + 1) % projects.value.length;
};

const prevSlide = () => {
  stopAutoplay();
  startAutoplay();
  activeIndex.value = (activeIndex.value - 1 + projects.value.length) % projects.value.length;
};

const setActive = (index) => {
  stopAutoplay();
  startAutoplay();
  activeIndex.value = index;
};

const emit = defineEmits(['close']);

const closeCarousel = () => {
  emit('close');
};

const startAutoplay = () => {
  autoplayInterval = setInterval(nextSlide, 10000); 
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>
<style lang="scss" scoped>
@import '../styles/ProjectCarousel.scss';
</style>
