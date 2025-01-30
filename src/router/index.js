import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import DashBoard from '@/views/DashBoard.vue';
import AddSubestacao from '@/views/AddSubestacao.vue';
const routes = [
  { path: '/',
    name: 'Login',
    component: LoginPage },
    { path: '/dashboard',
      name: 'DashBoard',
      component: DashBoard },
      {
        path: '/add-subestacao',
        name: 'AddSubestacao',
        component: AddSubestacao,
      },

  // Outras páginas serão adicionadas depois
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;