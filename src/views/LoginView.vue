<template>
  <v-container class="d-flex flex-column align-center justify-center" style="height: 100vh;">
    <CardPadrao class="mx-auto pa-4" style="width: 350px;">
      <v-card-title class="text-h6 text-center">
        Fazer Login
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="E-mail"
          variant="outlined"
          v-model="email"
        />
        <v-text-field
          label="Senha"
          variant="outlined"
          type="password"
          v-model="senha"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          block
          @click="entrar"
        >
          Entrar
        </v-btn>
      </v-card-actions>
    </CardPadrao>
    <div class="mt-4 text-center">
        Ainda não tem uma conta?
        <router-link to="/cadastro">
          Cadastrar
        </router-link>
      </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import CardPadrao from '../components/CardPadrao.vue'

const email = ref('')
const senha = ref('')
const erro = ref('')

const authStore = useAuthStore()
const router = useRouter()

async function entrar() {
  erro.value = ''

  try {
    await authStore.login(email.value, senha.value)

    router.push('/')

  } catch (e) {
    erro.value = e.message
  }
}
</script>