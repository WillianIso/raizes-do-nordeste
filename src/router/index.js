import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '../layouts/MainLayout.vue'

import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import CardapioView from '../views/CardapioView.vue'
import PromocoesView from '../views/PromocoesView.vue'
import CarrinhoView from '../views/CarrinhoView.vue'
import PerfilView from '../views/PerfilView.vue'
import MeusPedidosView from '../views/MeusPedidosView.vue'

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
      {
        path: 'promocoes',
        component: PromocoesView
      },
      {
        path: 'carrinho',
        component: CarrinhoView
      },
      {
        path: 'perfil',
        component: PerfilView
      },
      {
        path: 'meus-pedidos',
        component: MeusPedidosView
      }
    ],
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})