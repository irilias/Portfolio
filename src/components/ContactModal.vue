<template>
  <div class="modal__overlay" @click="closeModal">
    <div class="modal__content" @click.stop>
      <button class="modal__close-button" @click="closeModal">×</button>
      <h2 class="modal__heading">{{ languageContent[currentLanguage].heading }}</h2>
      <form @submit.prevent="submitForm">
        <div class="modal__form-row">
          <div class="modal__form-group">
            <label for="name" class="modal__label">{{ languageContent[currentLanguage].name }}</label>
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
                  <label for="attachment" class="modal__label">{{ languageContent[currentLanguage].attachmentFile }}</label>
                  <div class="modal__file-upload">
                    <label for="attachment" class="modal__file-label">
                      <span class="modal__file-text">{{ selectedFile || languageContent[currentLanguage].browse }}</span>
                      <span class="modal__file-icon">📎</span>
                    </label>
                    <input type="file" id="attachment" @change="handleFileUpload" class="modal__file-input">
                  </div>
                </div>
        <button type="submit" class="modal__submit-button">{{ languageContent[currentLanguage].submitButton }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close']);
const props = defineProps(['currentLanguage']);

const languageContent = ref({
EN: {
  heading: "Contact Me",
  name: "Name",
  attachmentFile:" Attachment (optional)",
  browse: "Browse...",
  submitButton: "Send Message",
},
FR: {
  heading: "Contactez-moi",
  name: "Nom",
  attachmentFile:"Pièce jointe (optionnelle)",
  browse: "Parcourir...",
  submitButton: "Envoyer le Message",
}
});

const form = ref({
  name: '',
  email: '',
  message: '',
  attachment: null,
});

const selectedFile = ref("");

const handleFileUpload = (event) => {
const file = event.target.files[0];
if (file) {
  selectedFile.value = file.name; 
  form.value.attachment = file;
} else {
  selectedFile.value = ""; 
  form.value.attachment = null;
}
};

const closeModal = () => {
  emit('close');
};

const submitForm = () => {
  console.log('Form submitted:', form.value);
  closeModal();
};
</script>


<style lang="scss" scoped>
@import '../styles/ContactModal.scss';
</style>

