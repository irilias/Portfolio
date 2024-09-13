<script setup>
import Home from './views/Home.vue';
</script>

<template>
  <div class="app">
    <Home />
  </div>
</template>
<style lang="scss">
@import './styles/variables';
@import './styles/mixins';

.app {
  min-height: 100vh;
  position: relative;
}
.home {
  position: relative;
  z-index: 1;
}
</style>
