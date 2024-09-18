<template>
  <div class="carousel-modal__overlay" @click="closeCarousel">
    <div class="carousel-modal__content" ref="carouselContainer" @click.stop>
      <button class="carousel__arrow carousel__arrow--left"  @touchstart="handleTouchStart" @touchend="handleTouchEnd" @click="previousProject"></button>
      <ProjectCard 
        :project="currentProject" 
        @close="closeCarousel"
      />
      <button class="carousel__arrow carousel__arrow--right"  @touchstart="handleTouchStart" @touchend="handleTouchEnd"  @click="nextProject"></button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed  } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSwipe } from '@vueuse/core';
import ProjectCard from './ProjectCard.vue';

const emit = defineEmits(['close']);
const { t } = useI18n();
const currentIndex = ref(0);

const projects = ref([
  {
    id: 'engie',
    image: '/engie.webp',
    tags: ['ASP.NET Core', 'C#', 'VB.NET', 'EF Core', 'JavaScript', 'jQuery', 'Bootstrap', 'CSS3', 'HTML5', 'SQL Server', 'Azure DevOps', 'TFVC','Azure Service Bus', 'SonarQube', 'MSTest', 'Moq', 'Automapper', 'Cypress', 'Log4net'],
    liveDemo: '#',
    repository: '#',
    status: 'confidential',
  },
  {
    id: 'obs',
    image: '/obs.webp',
    tags: ['.NET 6', 'C#', 'EF Core', 'Vue.js', 'JavaScript', 'Boosted', 'CSS3', 'SASS', 'BEM', 'HTML5', 'SQL Server', 'Azure DevOps','Git', 'SonarQube', 'Docker', 'Redis', 'Event Bus', 'CaaS', 'xUnit', 'JetBrains dotTrace', 'Serilog', 'Kibana'],
    liveDemo: '#',
    repository: '#',
    status: 'confidential',
  },
  {
    id: 'axilum',
    image: '/axilum.webp',
    tags: ['ASP.NET Webforms','ASP.NET Winforms', 'C#', 'Powershell', 'Bash', 'Windows Embedded 8', 'Azure AD', 'JavaScript', 'CSS3', 'HTML5'],
    liveDemo: '#',
    repository: '#',
    status: 'confidential',
  },
  {
    id: 'gunnebo',
    image: '/gunnebo.webp',
    tags: ['C++','C#/.NET', 'Windows CE 7', 'Xamarin', 'NFC', 'QR Code', 'SQLite', 'Azure AD', 'JavaScript', 'CSS3', 'HTML5'],
    liveDemo: '#',
    repository: '#',
    status: 'confidential',
  },
  {
    id: 'portfolio',
    image: '/portfolio.webp',
    tags: ['Vue.js', 'SCSS', 'BEM', 'Git', 'Vercel'],
    liveDemo: 'https://www.ilyasrima.dev/',
    repository: 'https://github.com/irilias/Portfolio',
    status: 'public',
  },
  {
    id: 'salaires',
    image: '/salaires.dev.webp',
    tags: ['Vue.js', 'SCSS', 'BEM'],
    liveDemo: '#',
    repository: '#',
    status: 'in-progress'
  }
]);



const nextProject = () => {
  currentIndex.value = (currentIndex.value + 1) % projects.value.length;
};

const previousProject = () => {
  currentIndex.value = (currentIndex.value - 1 + projects.value.length) % projects.value.length;
};

const generateSrcSet = (imageName) => {
  const sizes = [320, 375, 414, 768, 1024, 1280, 1440, 1920, 2560];
  const baseName = imageName.split('.')[0];
  return sizes.map(size => `${baseName}-${size}w.webp ${size}w`).join(', ');
};

const currentProject = computed(() => {
  const project = projects.value[currentIndex.value];
  return {
    ...project,
    title: t(`projects.${project.id}.title`),
    description: t(`projects.${project.id}.description`),
    image: generateSrcSet(project.image)
  };
});

const nextProjectImage = computed(() => {
  const nextIndex = (currentIndex.value + 1) % projects.value.length;
  return generateSrcSet(projects.value[nextIndex].image);
});

const preloadNextImage = () => {
  const sizes = [320, 375, 414, 768, 1024, 1280, 1440, 1920, 2560];
  sizes.forEach(size => {
    const img = new Image();
    img.src = `/images/${nextProjectImage.value.split('.')[0]}-${size}w.webp`;
  });
};

watch(currentIndex, () => {
  preloadNextImage();
});

const closeCarousel = () => {
  emit('close');
};

// const goToSlide = (index) => {
//   currentIndex.value = index;
// };

const handleTouchStart = (event) => {
  event.target.classList.add('button-active');
};

const handleTouchEnd = (event) => {
  event.target.classList.remove('button-active');
};

const carouselContainer = ref(null);
const { isSwiping, direction } = useSwipe(carouselContainer);

watch([isSwiping, direction], ([swiping, dir]) => {
  if (!swiping) {
    if (dir === 'left') {
      nextProject();
    } else if (dir === 'right') {
      previousProject();
    }
  }
});

const carouselInterval = ref(null);
const startCarousel = () => {
  carouselInterval.value = setInterval(() => {
    nextProject();
  }, 300000); 
};
const stopCarousel = () => {
  clearInterval(carouselInterval.value);
};
const pauseCarousel = () => {
  stopCarousel();
  setTimeout(startCarousel, 10000); 
};

onMounted(() => {
  startCarousel();
  carouselContainer.value.addEventListener('mouseenter', stopCarousel);
  carouselContainer.value.addEventListener('mouseleave', startCarousel);
  carouselContainer.value.addEventListener('touchstart', pauseCarousel);
  preloadNextImage();
});
onUnmounted(() => {
  stopCarousel();
});

</script>

<style lang="scss" scoped>
@import '../styles/ProjectCarousel.scss';
</style>


