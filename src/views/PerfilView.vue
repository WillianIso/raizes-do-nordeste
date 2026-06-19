<template>
  <div>
    <h1 class="text-center">Perfil</h1>
    <p>
      Nome: {{ authStore.usuario?.nome }}
    </p>
    <p>
      E-mail: {{ authStore.usuario?.email }}
    </p>
    <p>
      Perfil: {{ authStore.usuario?.perfil }}
    </p>

    <CardPadrao>
      <v-card-title>
        Programa Fidelidade
      </v-card-title>

      <v-card-text>
        <p>
          Refrigerantes grátis:
          {{
            fidelidadeStore
              .refrigerantesDisponiveis
          }}
        </p>
        <p>
          Descontos de R$50:
          {{ fidelidadeStore.descontosDisponiveis }}
        </p>
      </v-card-text>
    </CardPadrao>
    <CardPadrao class="mt-4">
      <v-card-title>
        Próximas Recompensas
      </v-card-title>
      <v-card-text>

        Pedidos concluídos:
        {{ fidelidadeStore.pedidosEntregues }}

        <br>

        Faltam
        {{ 2 - (fidelidadeStore.pedidosEntregues % 2) }}
        pedidos para ganhar
        um refrigerante.

        <br>

        Faltam
        {{ 3 - (fidelidadeStore.pedidosEntregues % 3) }}
        pedidos para ganhar
        R$50 de desconto.

      </v-card-text>
    </CardPadrao>
    <v-btn @click="sair" class="mt-10" color="error" block>
      Sair
    </v-btn>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useFidelidadeStore } from '../stores/fidelidade'
import CardPadrao from '../components/CardPadrao.vue'

const authStore = useAuthStore()
const router = useRouter()
const fidelidadeStore = useFidelidadeStore()

function sair() {
  authStore.logout()
  router.push('/login')
}
</script>