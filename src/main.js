import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import '@/assets/style/style.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App).use(router)
app.use(VueAxios, axios)
app.mount('#app');
