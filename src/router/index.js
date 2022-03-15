import { createWebHistory, createRouter } from 'vue-router'

import MainPage from '../pages/MainPage.vue'
import OrderPage from '../pages/OrderPage.vue'
import FinalPage from '../pages/FinalPage.vue'

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
    },
    {
        path: '/final',
        name: 'FinalPage',
        component: FinalPage
    },
];

const router = createRouter({
    history: createWebHistory('need-for-drive'),
    routes,
  });

export default router;