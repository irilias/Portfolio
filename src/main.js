import { createApp } from 'vue'
import './styles/global.scss'
import App from './App.vue'
import emailjs from '@emailjs/browser'

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

createApp(App).mount('#app')
