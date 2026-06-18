import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '../layouts/MainLayout.vue'

import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import CardapioView from '../views/CardapioView.vue'


const routes = [
 {
    path: '/login',
    component: LoginView
  },
  {
    path: '/cadastro',
    component: CadastroView
  },

  {
    path: '/',
    component: MainLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        component: CardapioView
      },
    ],
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})