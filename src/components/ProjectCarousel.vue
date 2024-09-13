<template>
  <div class="carousel-modal__overlay" @click="closeCarousel">
    <div class="carousel-modal__content" @click.stop>
    <ProjectCard :project="projects[0]" :currentLanguage="currentLanguage" :languageContent="languageContent" @close="closeCarousel"/>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useSwipe } from '@vueuse/core';
import ProjectCard from './ProjectCard.vue';

const props = defineProps(['currentLanguage']);
const emit = defineEmits(['close']);

const projects = ref([
  {
    title: {
      EN: 'Energy Pricing Tools and Technical Migration (Opteam & Explore)',
      FR: 'Outils de Tarification Énergie et Migration Technique (Opteam & Explore)',
    },
    description: {
      EN: 'Full-Stack Engineer involved in the design and development of Opteam and Explore, energy pricing applications. I contributed to the migration to a new technical stack to enhance performance and maintainability, while helping train new recruits and implementing key architectural improvements.',
      FR: 'Ingénieur Full-Stack, j’ai participé à la conception et au développement des applications Opteam et Explore pour la tarification de l\'énergie. J\'ai également contribué à la migration vers un nouveau socle technique afin d\'améliorer les performances et la maintenabilité, tout en aidant à la formation des nouvelles recrues et en mettant en place des améliorations architecturales.',
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
      FR: 'En tant qu\'ingénieur Full-Stack, j\'ai participé au développement d\'Abacus, un outil de tarification B2B pour Orange Business Services. J\'ai conçu de nouvelles fonctionnalités, contribué à la migration du front-end et du back-end, et amélioré la résilience de l\'application. J\'ai également mis en place un système de notifications en temps réel pour suivre la progression des opérations asynchrones déclenchées via un Event Bus, offrant ainsi une meilleure visibilité aux utilisateurs sur l\'état d\'avancement des processus. J\'ai collaboré avec des équipes internationales sur divers aspects techniques et fonctionnels.',
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
      FR: 'Développement d\'un Système de Mise à Jour Automatisée pour Robots Médicaux',
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

const closeCarousel = () => {
  emit('close');
};

</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

.carousel-modal{
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    background-color: $background-color;
    border-radius: 10px;
    z-index: 1000;
    overflow: hidden;
    padding: 20px;
  }
}
</style>