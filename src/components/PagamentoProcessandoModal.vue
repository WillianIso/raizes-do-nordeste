<script setup>
import { usePagamentoStore } from '../stores/pagamento'

const store = usePagamentoStore()
</script>

<template>
  <v-dialog
    v-model="store.carregando"
    persistent
  >
    <v-card class="text-center py-6">
      <v-card-title>
        Processando pagamento
      </v-card-title>

      <v-card-text>
        <v-progress-circular
          indeterminate
          color="primary"
          size="48"
        />
        <div class="mt-3">
          Aguarde...
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>