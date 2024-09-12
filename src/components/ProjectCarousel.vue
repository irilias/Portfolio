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
            <div class="carousel__info">
              <h2 class="carousel__title">{{ project.title[currentLanguage] }}</h2>
              <div class="carousel__description">
                {{ truncatedDescription }}
                <span v-if="!showFullDescription && project.description[currentLanguage].length > 150" class="read-more" @click="toggleDescription">
                  {{ languageContent[currentLanguage].readMore }}
                </span>
              </div>
              <div class="carousel__tags">
                <span v-for="(tag, tagIndex) in project.tags" :key="tagIndex" class="carousel__tag">{{ tag }}</span>
              </div>
              <div class="carousel__buttons">
                <a :href="project.liveDemo" target="_blank" class="carousel__button">{{ languageContent[currentLanguage].demo }}</a>
                <a :href="project.repository" target="_blank" class="carousel__button">{{ languageContent[currentLanguage].repository }}</a>
              </div>
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
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useSwipe } from '@vueuse/core';

const props = defineProps(['currentLanguage']);

const hoverTooltip = ref({
  demo: { show: false, message: '' },
  repository: { show: false, message: '' }
});

const languageContent = ref({
  EN: {
    repository: "Repository",
    demo: "Live Demo",
    confidentialMessage: "This project is confidential and access to the repository and live demo is restricted.",
    inProgressMessage: "This project is currently in progress. The repository and live demo are not available yet.",
    readMore: "Read More",
  },
  FR: {
    repository: "Dépôt",
    demo: "Démo en Direct",
    confidentialMessage: "Ce projet est confidentiel et l'accès au dépôt et à la démo en direct est restreint.",
    inProgressMessage: "Ce projet est actuellement en cours. Le dépôt et la démo en direct ne sont pas encore disponibles.",
    readMore: "Lire la suite",
  }
});

const projects = ref([
  {
    title: {
      EN: 'Energy Pricing Tools and Technical Migration (Opteam & Explore)',
      FR: 'Outils de Tarification Énergie et Migration Technique (Opteam & Explore)',
    },
    description: {
      EN: 'Full-Stack Engineer responsible for designing and developing Opteam and Explore, energy pricing applications. Led the migration to a new technical stack to improve performance and maintainability, while training new recruits and implementing key architectural optimizations.',
      FR: 'Ingénieur Full-Stack en charge de la conception et du développement des applications Opteam et Explore pour la tarification de l\'énergie. J\'ai également géré la migration vers un nouveau socle technique pour améliorer la performance et la maintenabilité, tout en formant les nouvelles recrues et en apportant des optimisations architecturales.',
    },
    image: '/engie.webp',
    tags: ['ASP.NET Core', 'C#', 'VB.NET', 'EF Core', 'JavaScript', 'jQuery', 'Bootstrap', 'CSS3', 'HTML5', 'SQL Server', 'Azure DevOps', 'TFVC','Azure Service Bus', 'SonarQube', 'MSTest', 'Moq', 'Automapper', 'Cypress', 'Log4net'],
    liveDemo: 'https://project1-demo.com',
    repository: 'https://github.com/user/project1',
    status: 'confidential',
  },
  {
    title: {
      EN: 'Development of Abacus: Pricing Tool for the Product and Service Portfolio',
      FR: 'Développement d\'Abacus : Outil de Tarification pour le Portefeuille de Produits et Services',
    },
    description: {
      EN: 'As a Full-Stack Engineer, I contributed to the development of Abacus, a B2B pricing tool for Orange Business Services. I developed new features, worked on front-end and back-end migrations, and enhanced the application\'s resilience. I also implemented a real-time notification system to track the progress of asynchronous operations triggered by an Event Bus, providing users with better visibility into the status of ongoing processes. I collaborated with international teams on various technical and functional aspects.',
      FR: 'En tant qu\'ingénieur Full-Stack, j\’ai participé au développement d\'Abacus, un outil de tarification B2B pour Orange Business Services. J’ai conçu de nouvelles fonctionnalités, contribué à la migration du front-end et du back-end, et amélioré la résilience de l\'application. J\'ai également mis en place un système de notifications en temps réel pour suivre la progression des opérations asynchrones déclenchées via un Event Bus, offrant ainsi une meilleure visibilité aux utilisateurs sur l\'état d\'avancement des processus. J\'ai collaboré avec des équipes internationales sur divers aspects techniques et fonctionnels.',
    },
    image: '/obs.webp',
    tags: ['.NET 6', 'C#', 'EF Core', 'Vue.js', 'JavaScript', 'Boosted', 'CSS3', 'SASS', 'BEM', 'HTML5', 'SQL Server', 'Azure DevOps','Git', 'SonarQube', 'Docker', 'Redis', 'Event Bus', 'CaaS', 'xUnit', 'JetBrains dotTrace', 'Serilog', 'Kibana'],
    liveDemo: 'https://project2-demo.com',
    repository: 'https://github.com/user/project2',
    status: 'confidential',
  },
  {
    title: {
      EN: 'Design and Implementation of an Automated Update System for Medical Robots',
      FR: 'Développement d’un Système de Mise à Jour Automatisée pour Robots Médicaux',
    },
    description: {
      EN: 'As a Full-Stack Engineer at Axilum Robotics, I designed and developed an automated update system for their medical robots. I implemented a web application hosted on Azure to detect connected robots, prepare updates, and manage remote installations. Additionally, I developed a client-side WinForms application (robot) to retrieve and install updates, both online and offline. A SOAP-based web service was created to facilitate communication between the server and the robots. I also led functional prototyping and set up a test environment with two TMS-Robots.',
      FR: 'En tant qu\'ingénieur Full-Stack chez Axilum Robotics, j\'ai conçu et développé un système de mise à jour automatisée pour leurs robots médicaux. J\'ai mis en place une application web hébergée sur Azure permettant de détecter les robots connectés, de préparer les mises à jour et de gérer leur installation à distance. J\'ai également développé une application WinForms côté client (robot) pour récupérer et installer les mises à jour, que ce soit en ligne ou hors ligne. Un service web basé sur SOAP a été créé pour assurer la communication entre le serveur et les robots. J\'ai également assuré les tests fonctionnels et mis en place un environnement de développement avec un réseau de test.',
    },
    image: '/axilum.webp',
    tags: ['ASP.NET Webforms','ASP.NET Winforms', 'C#', 'Powershell', 'Bash', 'Windows Embedded 8', 'Azure AD', 'JavaScript', 'CSS3', 'HTML5'],
    liveDemo: 'https://project3-demo.com',
    repository: 'https://github.com/user/project3',
    status: 'confidential',
  },
  {
    title: {
      EN: 'NFC and QR Code Communication Integration for Banking Terminals',
      FR: 'Intégration de Communication NFC/QR Code sur Automate Bancaire',
    },
    description: {
      EN: 'As an Embedded Systems R&D Engineer, I designed and developed C++ libraries to interface RS232 barcode readers with an embedded card running on Windows CE. I also created a cross-platform mobile application enabling seamless NFC and QR code communication between a smartphone and a banking terminal. This project involved prototyping, functional testing, and comprehensive system documentation. Additionally, I managed the technical interface between Gunnebo and its suppliers to ensure smooth integration of their technologies.',
      FR: 'En tant qu\'ingénieur R&D en systèmes embarqués, j\'ai conçu et développé des bibliothèques en C++ pour interfacer des lecteurs de code-barres RS232 avec une carte embarquée fonctionnant sous Windows CE. J\'ai également créé une application mobile multiplateforme permettant une communication fluide entre un smartphone et un automate bancaire via NFC et QR code. Ce projet incluait le prototypage, les tests fonctionnels ainsi que la documentation complète du système. J\'ai aussi assuré l\'interface technique entre Gunnebo et ses fournisseurs pour garantir l\'intégration fluide de leurs technologies.',
    },
    image: '/gunnebo.webp',
    tags: ['C++','C#/.NET', 'Windows CE 7', 'Xamarin', 'NFC', 'QR Code', 'SQLite', 'Azure AD', 'JavaScript', 'CSS3', 'HTML5'],
    liveDemo: 'https://project3-demo.com',
    repository: 'https://github.com/user/project3',
    status: 'confidential',
  },
  {
    title: {
      EN: 'Personal Portfolio: Projects and Professional Experiences',
      FR: 'Portfolio Personnel : Projets et Expériences Professionnelles',
    },
    description: {
      EN: 'This portfolio showcases a selection of my projects and experiences, highlighting my Full-Stack development skills, particularly in .NET, Vue.js, and Azure.',
      FR: 'Ce portfolio présente une sélection de mes projets et expériences, illustrant mes compétences en développement Full-Stack, notamment en .NET, Vue.js, et Azure.',
    },
    image: '/portfolio.webp',
    tags: ['Vue.js', 'SCSS', 'BEM'],
    liveDemo: 'https://project3-demo.com',
    repository: 'https://github.com/user/project3',
    status: 'public',
  },
  {
    title: {
      EN: 'Frontend Development for salaires.dev',
      FR: 'Développement du frontend pour salaires.dev',
    },
    description: {
      EN: 'Currently designing and developing an interactive frontend for the salaires.dev platform using Vue.js, aimed at enhancing user experience and navigation.',
      FR: 'Actuellement en train de concevoir et développer un frontend interactif pour la plateforme salaires.dev en utilisant Vue.js, afin d\'améliorer l\'expérience utilisateur et la navigation.',
    },
    image: '/salaires.dev.webp',
    tags: ['Vue.js', 'SCSS', 'BEM'],
    liveDemo: 'https://project3-demo.com',
    repository: 'https://github.com/user/project3',
    status: 'in-progress'
  }
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
  autoplayInterval = setInterval(nextSlide, 1000000000); 
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

const showFullDescription = ref(false);

const truncatedDescription = computed(() => {
  const description = projects.value[activeIndex.value].description[props.currentLanguage];
  if (showFullDescription.value || description.length <= 150) {
    return description;
  }
  return description.slice(0, 150) + '...';
});

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

const target = ref(null);
const { isSwiping, direction } = useSwipe(target, {
  threshold: 50,
  onSwipe(e) {
    if (direction.value === 'left') {
      nextSlide();
    } else if (direction.value === 'right') {
      prevSlide();
    }
  },
});

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
const showTooltip = (status, type) => {
  if (status !== 'public' && !hoverTooltip.value[type].show) {
    hoverTooltip.value[type] = {
      show: true,
      message: status === 'confidential' 
        ? languageContent.value[props.currentLanguage].confidentialMessage
        : languageContent.value[props.currentLanguage].inProgressMessage
    };
  }
};

const hideTooltip = (type) => {
  hoverTooltip.value[type].show = false;
};

</script>


<style lang="scss" scoped>
@import '../styles/ProjectCarousel.scss';
</style>
