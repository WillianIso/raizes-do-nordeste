<template>
  <v-container>
    <h1 class="mb-4 text-center">
      Meu Carrinho
    </h1>
    <v-alert v-if="carrinhoStore.itens.length === 0" type="info">
      Seu carrinho está vazio.
    </v-alert>
    <CardPadrao v-for="item in carrinhoStore.itens" :key="item.id" class="mb-3">
      <v-card-title>
        {{ item.nome }}
      </v-card-title>
      <v-card-text>
        <div>
          Quantidade:
          {{ item.quantidade }}
        </div>
        <div>
          Valor unitário:
          R$ {{ item.preco.toFixed(2) }}
        </div>
        <div>
          Subtotal:
          R$ {{ (item.preco * item.quantidade).toFixed(2) }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="carrinhoStore.remover(item.id)" block>
          Remover
        </v-btn>
      </v-card-actions>
    </CardPadrao>

    <CardPadrao v-if="carrinhoStore.itens.length > 0">
      <v-card-title>
        Resumo
      </v-card-title>
      <v-card-text>
        <div class="mb-2">
          <strong>
            Total: R$
            {{ carrinhoStore.total.toFixed(2) }}
          </strong>
        </div>
        <div v-if="
          fidelidadeStore.descontosDisponiveis > 0 ||
          fidelidadeStore.refrigerantesDisponiveis > 0
        ">
          <div class="text-subtitle-2 mb-1">
            Benefícios disponíveis
          </div>
          <v-checkbox v-if="fidelidadeStore.descontosDisponiveis > 0" v-model="usarDesconto"
            :disabled="carrinhoStore.subtotal < 50" label="Aplicar desconto de R$50" hide-details />
          <v-checkbox v-if="fidelidadeStore.refrigerantesDisponiveis > 0" v-model="usarRefrigerante"
            label="Usar refrigerante grátis" hide-details />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" block @click="finalizarPedido()">
          Finalizar Pedido
        </v-btn>
      </v-card-actions>
    </CardPadrao>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCarrinhoStore } from '../stores/carrinho'
import { useFidelidadeStore } from '../stores/fidelidade'
import { computed } from 'vue'
import CardPadrao from '../components/CardPadrao.vue'
import { criarPedido } from '../services/pedidoService'
import { useAuthStore } from '../stores/auth'

const router = useRouter()

const carrinhoStore = useCarrinhoStore()
const fidelidadeStore = useFidelidadeStore()
const authStore = useAuthStore()

const usarDesconto = computed({
  get: () => carrinhoStore.usarDesconto,
  set: value => carrinhoStore.setDescontoUsado(value)
})

const usarRefrigerante = computed({
  get: () => carrinhoStore.incluirRefrigerante,
  set: value => carrinhoStore.setRefrigeranteUsado(value)
})

function finalizarPedido() {
  criarPedido(
    authStore.usuario,
    carrinhoStore.itensComBeneficios,
    carrinhoStore.total
  )
  carrinhoStore.limpar()
  router.push('/meus-pedidos')
}

</script>