<template>
    <div class="modal__overlay" @click="closeModal">
      <div class="modal__content" @click.stop>
        <button class="modal__close-button" @click="closeModal">×</button>
        <h2 class="modal__heading">Contact Me</h2>
        <form @submit.prevent="submitForm">
          <div class="modal__form-row">
            <div class="modal__form-group">
              <label for="name" class="modal__label">Name</label>
              <input type="text" id="name" v-model="form.name" class="modal__input" required>
            </div>
            <div class="modal__form-group">
              <label for="email" class="modal__label">Email</label>
              <input type="email" id="email" v-model="form.email" class="modal__input" required>
            </div>
          </div>
          <div class="modal__form-group">
            <label for="message" class="modal__label">Message</label>
            <textarea id="message" v-model="form.message" class="modal__textarea" required></textarea>
          </div>
          <div class="modal__form-group">
            <label for="attachment" class="modal__label">Attachment (optional)</label>
            <input type="file" id="attachment" @change="handleFileUpload" class="modal__file-input">
          </div>
          <button type="submit" class="modal__submit-button">Send Message</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const emit = defineEmits(['close']);
  const form = ref({
    name: '',
    email: '',
    message: '',
    attachment: null,
  });
  
  const closeModal = () => {
    emit('close');
  };
  
  const handleFileUpload = (event) => {
    form.value.attachment = event.target.files[0];
  };
  
  const submitForm = () => {
    // Handle form submission logic here
    console.log('Form submitted:', form.value);
    closeModal();
  };
  </script>
  
  <style scoped lang="scss">
  .modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }
  
  .modal__content {
    background-color: #1a1a1a;
    color: #ffffff;
    padding: 2rem;
    border-radius: 10px;
    max-width: 600px;
    width: 90%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    text-align: left;
    overflow: hidden;
  }
  
  .modal__close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #ffffff;
  }
  
  .modal__heading {
    color: #28de67;
    margin-bottom: 1rem;
  }
  
  .modal__form-group {
    margin: 1rem;
  }
  
  .modal__label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #ffffff;
  }
  
  .modal__input,
  .modal__textarea,
  .modal__file-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #555555;
    border-radius: 5px;
    background-color: #333333;
    color: #ffffff;
  }
  
  .modal__textarea {
    resize: vertical;
    min-height: 150px;
  }
  
  .modal__form-row {
    display: flex;
    justify-content: space-between;
  
    .modal__form-group {
      flex: 1;
    }
  }
  
  .modal__submit-button {
    background-color: #28de67;
    color: #ffffff;
    border: none;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border-radius: 25px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease;
  
    &:hover {
      background-color: #1ebd53;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .modal__content {
      padding: 1.5rem;
      max-width: 100%;
    }
  
    .modal__form-row {
      flex-direction: column;
    }
  
    .modal__form-group {
      margin: 1rem;
    }
  
    .modal__submit-button {
      width: 100%;
    }
  }
  </style>
  