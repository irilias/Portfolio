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

<style scoped lang="scss">
.modal {
&__overlay {
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

&__content {
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

&__close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ffffff;
}

&__heading {
  color: #28de67;
  margin-bottom: 1.5rem;
  text-align: center;
}

&__form-group {
  margin-bottom: 1.5rem;
}

&__label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #ffffff;
}

&__input,
&__textarea,
&__file-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #555555;
  border-radius: 5px;
  background-color: #333333;
  color: #ffffff;
}

&__textarea {
  resize: vertical;
  min-height: 150px;
}
  &__file-upload {
    position: relative;
    display: inline-block;
    width: 100%;
    background-color: #28de67;
    border-radius: 25px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #1ebd53;
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }
  }

  &__file-label {
    color: #ffffff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
&__file-text {
  margin-right: 10px;
}

&__file-icon {
  font-size: 1.2rem;
}

&__file-input {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

&__submit-button {
  background-color: #28de67;
  color: #ffffff;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 25px;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #1ebd53;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
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

@media (max-width: 768px) {
.modal {
  &__content {
    padding: 1.5rem;
    max-width: 100%;
  }

  &__form-group {
    margin: 1rem;
  }

  &__submit-button {
    max-width: 100%;
  }
}
}
</style>
