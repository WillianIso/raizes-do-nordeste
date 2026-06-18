<template>
  <v-dialog v-model="store.visivel" width="400">
    <CardPadrao class="mx-auto" :prepend-icon="store.icone" :title="store.titulo" max-width="400">

      <v-card-text class="text-justify">
        {{ store.mensagem }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="store.visivel = false">
          OK
        </v-btn>
      </v-card-actions>
    </CardPadrao>
  </v-dialog>

</template>

<script setup>
import { useNotificacaoStore } from '../stores/notificacao'
import CardPadrao from './CardPadrao.vue'

const store = useNotificacaoStore()
</script>