import { createWebHistory, createRouter } from 'vue-router'

import MainPage from '../pages/MainPage.vue'
import OrderPage from '../pages/OrderPage.vue'

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
    },
    {
        path: '/order',
        name: 'OrderPage',
        component: OrderPage
    }
];

const router = createRouter({
    history: createWebHistory('need-for-drive'),
    routes,
  });

export default router;