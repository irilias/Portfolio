
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
    max-width: 80%;
    word-wrap: break-word;

    &.error {
      background-color: #dc3545;
    }

    &.success {
      background-color: #28a745;
    }

    &-enter-active, &-leave-active {
      transition: opacity 0.5s, transform 0.5s;
    }

    &-enter-from, &-leave-to {
      opacity: 0;
      transform: translateY(-20px);
    }

    @media (max-width: 768px) {
      top: 10px;
      right: 10px;
      left: 10px;
      max-width: calc(100% - 20px);
      font-size: 14px;
      padding: 8px 16px;
    }

    @media (max-width: 480px) {
      font-size: 12px;
      padding: 6px 12px;
    }
  }
  </style>
