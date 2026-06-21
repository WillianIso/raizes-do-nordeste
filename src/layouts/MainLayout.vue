<template>
  <v-app>
    <v-app-bar>
      <v-btn
        icon="mdi-arrow-left"
        @click="voltar"
      />
      <v-app-bar-title class="text-h6 text-center">
        <div >
          <v-img :src="titulo" width="300" class="mx-auto" />
        </div>
      </v-app-bar-title>
      <v-btn
        hidden
      />
    </v-app-bar>

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>

    <div class="bottom-nav-scroll">
    <v-bottom-navigation grow>
      <v-btn to="/">
        <v-icon>mdi-food</v-icon>
        Cardápio
      </v-btn>
      <v-btn to="/promocoes">
        <v-icon>mdi-sale</v-icon>
        Promoções
      </v-btn>
      <v-btn to="/carrinho">
        <v-icon>mdi-cart</v-icon>
        Carrinho
      </v-btn>
      <v-btn to="/meus-pedidos">
        <v-icon>mdi-receipt-text</v-icon>
        Pedidos
      </v-btn>
      <v-btn to="/perfil">
        <v-icon>mdi-account</v-icon>
        Perfil
      </v-btn>
    </v-bottom-navigation>
    </div>
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import titulo from '../assets/titulo.png'
import { makeVDataTableVirtualProps } from 'vuetify/lib/components/VDataTable/VDataTableVirtual.mjs'

const router = useRouter()

function voltar() {
  router.back()
}
</script>

<style>
.v-container {
  background-color: #F8F9FA !important;
}
.v-btn {
  text-align: center;
}

.bottom-nav-scroll {
  overflow-x: auto;
  white-space: nowrap;
}

.bottom-nav-scroll .v-bottom-navigation {
  min-width: max-content;
}
</style>