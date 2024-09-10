
<template>
  <transition name="toast">
    <div v-if="show" class="toast" :class="type">
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  show: Boolean,
  message: String,
  type: {
    type: String,
    default: 'success'
  }
});

defineEmits(['close']);
</script>
  <style scoped lang="scss">
  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 4px;
    color: white;
    z-index: 9999;

    &.error {      background-color: #dc3545;
    }

    &.success {
      background-color: #28a745;
    }

    &-enter-active, &-leave-active {
      transition: opacity 0.5s;
    }

    &-enter-from, &-leave-to {
      opacity: 0;
    }
  }
  </style>
