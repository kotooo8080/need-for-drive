import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import '@/assets/style/style.scss'

createApp(App).use(router).mount('#app')
