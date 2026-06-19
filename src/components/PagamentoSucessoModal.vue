<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePagamentoStore } from '../stores/pagamento'

const router = useRouter()
const store = usePagamentoStore()

const mostrar = computed({
  get: () => Boolean(store.resultado && store.resultado.sucesso),
  set: (value) => {
    if (!value) {
      store.resultado = null
    }
  }
})

function verPedidos() {
  mostrar.value = false
  router.push('/meus-pedidos')
}
</script>

<template>
  <v-dialog
    v-model="mostrar"
    max-width="420"
  >
    <v-card>
      <v-card-title class="text-success">
        Pagamento aprovado
      </v-card-title>

      <v-card-text>
        <p class="mb-2">
          Sua transação foi concluída com sucesso.
        </p>
        <p class="text-caption">
          Transação: {{ store.resultado?.transacaoId }}
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="success"
          @click="verPedidos"
        >
          Ver meus pedidos
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>