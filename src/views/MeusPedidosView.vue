<template>
  <v-container>
    <h1 class="mb-4 text-center">
      Meus Pedidos
    </h1>
    <v-alert v-if="pedidos.length === 0" type="info">
      Nenhum pedido encontrado.
    </v-alert>
    <CardPadrao v-for="pedido in pedidos" :key="pedido.id" class="mb-4">
      <v-card-title>
        Pedido #{{ pedido.id }}
      </v-card-title>

      <v-card-subtitle>

        {{ new Date(pedido.data).toLocaleString('pt-BR') }}

      </v-card-subtitle>
      <v-card-text>
        <div class="mb-4">
          <strong>Status:</strong>
          {{ descricaoStatus(pedido.status) }}

        </div>
        <v-stepper :model-value="indiceStatus(
          pedido.status
        )
          ">
          <v-stepper-header>

            <v-stepper-item :value="1" title="Recebido" />
            <v-stepper-item :value="2" title="Preparo" />
            <v-stepper-item :value="3" title="Entrega" />
            <v-stepper-item :value="4" title="Concluído" />
          </v-stepper-header>
        </v-stepper>
        <v-divider class="my-4" />
        <h4>Itens</h4>
        <v-list>
          <v-list-item v-for="item in pedido.itens" :key="item.id">
            <v-list-item-title>
              {{ item.nome }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Qtd:
              {{ item.quantidade }}

            </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-divider class="my-4" />
        <strong>
          Total:
          R$ {{ pedido.total.toFixed(2) }}
        </strong>
        <p>
          Pagamento:
          {{ pedido.pagamento.status }}
        </p>
        <p>
          Método:
          {{ pedido.pagamento.metodo }}
        </p>
      </v-card-text>
    </CardPadrao>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { listarPedidos } from '../services/pedidoService'
import CardPadrao from '../components/CardPadrao.vue'

const authStore = useAuthStore()
const pedidos = ref([])
let intervalo = null

function descricaoStatus(status) {
  const mapa = {
    RECEBIDO: 'Pedido Recebido',
    EM_PREPARO: 'Em Preparo',
    SAIU_PARA_ENTREGA: 'Saiu para Entrega',
    ENTREGUE: 'Entregue'
  }
  return mapa[status]
}

function indiceStatus(status) {
  const mapa = {
    RECEBIDO: 1,
    EM_PREPARO: 2,
    SAIU_PARA_ENTREGA: 3,
    ENTREGUE: 4
  }
  return mapa[status]
}

async function carregarPedidos() {
  pedidos.value =
    await listarPedidos(
      authStore.usuario.id
    )
}

onMounted(async () => {
  await carregarPedidos()
  intervalo = setInterval(
    carregarPedidos,
    1000
  )
})

onUnmounted(() => {
  clearInterval(intervalo)
})
</script>
