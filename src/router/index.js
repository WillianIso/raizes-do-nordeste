import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import MainLayout from '../layouts/MainLayout.vue'

import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import CardapioView from '../views/CardapioView.vue'
import PromocoesView from '../views/PromocoesView.vue'
import CarrinhoView from '../views/CarrinhoView.vue'
import PerfilView from '../views/PerfilView.vue'
import MeusPedidosView from '../views/MeusPedidosView.vue'
import PagamentoView from '../views/PagamentoView.vue'

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
      },
      {
        path: 'pagamento',
        component: PagamentoView
      }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})



router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    !authStore.autenticado
  ) {
    return '/login'
  }

  return true
})

export default router