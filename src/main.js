import { createApp } from 'vue'
import './styles/global.scss'
import App from './App.vue'
import emailjs from '@emailjs/browser'
import i18n from './i18n';

emailjs.init({
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    blockHeadless: true,
    blockList: {
      list: [],
      watchVariable: 'userEmail',
    },
    limitRate: {
      id: 'app',
      throttle: 10000,
    },
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
