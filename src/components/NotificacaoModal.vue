<template>
  <v-dialog v-model="store.visivel" width="400">
    <v-card>
      <v-card-title>
        Notificação
      </v-card-title>
      <v-card-text>
        {{ store.mensagem }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="store.visivel = false">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup>
import { useNotificacaoStore } from '../stores/notificacao'

const store = useNotificacaoStore()
</script>