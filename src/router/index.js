import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';

const routes = [
  { path: '/',
    name: 'Login',
    component: LoginPage },

  // Outras páginas serão adicionadas depois
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;