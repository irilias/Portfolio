<template>
  <div class="modal__overlay" @click="closeModal">
    <div class="modal__content" @click.stop>
      <button class="modal__close-button" @click="closeModal">×</button>
      <h2 class="modal__heading">{{ t('contact.heading') }}</h2>
      <form @submit.prevent="submitForm">
        <div class="modal__form-row">
          <div class="modal__form-group">
            <label for="name" class="modal__label">{{ t('contact.name') }}</label>
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
                  <label for="attachment" class="modal__label">{{ t('contact.attachmentFile') }}</label>
                  <div class="modal__file-upload">
                    <label for="attachment" class="modal__file-label">
                      <span class="modal__file-text">{{ selectedFile || t('contact.browse') }}</span>
                      <span class="modal__file-icon">📎</span>
                    </label>
                    <input type="file" id="attachment" @change="handleFileUpload" class="modal__file-input" disabled>
                  </div>
        </div>
        <button type="submit" class="modal__submit-button">{{ t('contact.submitButton') }}</button>
      </form>
    </div>
  </div>
  <ToastNotification 
    :show="showToast" 
    :message="toastMessage" 
    :type="toastType" 
    @close="showToast = false"
  />
</template>

<script setup>
import { ref } from 'vue';
import emailjs from '@emailjs/browser';
import ToastNotification from './ToastNotification.vue';
import { log, error } from '../utils/logger';
import { encryptData, decryptData } from '../utils/encryption';
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['close']);

const { t } = useI18n();
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

const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('success');

const canSendEmail = async () => {
  const today = new Date().toDateString();
  let messagesSent = {};
  
  try {
    const encryptedData = localStorage.getItem('messagesSent');
    if (encryptedData) {
      messagesSent = await decryptData(encryptedData);
    }
  } catch (e) {
    error('Error decrypting data:', e);
    messagesSent = {};
  }
  
  if (!messagesSent[today]) {
    messagesSent[today] = 0;
  }
  
  if (messagesSent[today] >= import.meta.env.VITE_MAX_MESSAGES_PER_DAY) {
    return false;
  }
  
  messagesSent[today]++;
  localStorage.setItem('messagesSent', await encryptData(messagesSent));
  return true;
};

const submitForm = async () => {
  if (!(await canSendEmail())) {
    toastMessage.value = t(`contact.maxMessagesReached`);
    toastType.value = 'error';
    showToast.value = true;
    return;
  }
  
  emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      from_name: form.value.name,
      from_email: form.value.email,
      message: form.value.message,
      to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL
    }
  )
  .then((response) => {
    log('Email sent successfully:', response);
    toastMessage.value = t(`contact.emailSentSuccess`);
    toastType.value = 'success';
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
      closeModal();
    }, 1500);
  }, (err) => {
    error('Failed to send email:', err);
    toastMessage.value = t(`contact.emailSentError`);
    toastType.value = 'error';
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  });
};
</script>
<style lang="scss" scoped>
@import '../styles/ContactModal.scss';
</style>

