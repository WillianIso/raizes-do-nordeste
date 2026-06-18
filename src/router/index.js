import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'

const routes = [
  {
    path: '/',
    component: LoginView
  },
  {
    path: '/cadastro',
    component: CadastroView
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})