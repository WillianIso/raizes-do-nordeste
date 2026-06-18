<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        Lanchonete Raízes do Nordeste
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>