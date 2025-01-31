import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import DashBoard from '@/views/DashBoard.vue';
import AddSubestacao from '@/views/AddSubestacao.vue';
import SubestacaoDetalhes from '@/views/SubestacaoDetalhes.vue';
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
      { path: '/subestacao/:id',
        component: SubestacaoDetalhes,
        props: true }

  // Podem ser adicionadas outras rotas depois para
  // as demais funcionalidades
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;