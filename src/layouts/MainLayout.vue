<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title class="text-h6 text-center">
        Raízes do Nordeste
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>

    <v-bottom-navigation>
      <v-btn to="/">
        Cardápio
      </v-btn>
      <v-btn to="/promocoes">
        Promoções
      </v-btn>
      <v-btn to="/carrinho">
        Carrinho
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>