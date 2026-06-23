<template>
  <v-container class="d-flex flex-column align-center justify-center" style="height: 100vh;">
    <div class="mx-auto mb-4">
      <v-img :src="logo" width="300" class="mx-auto" />
    </div>
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
import { useNotificacaoStore } from '../stores/notificacao'
import logo from '../assets/logo.png'

const email = ref('')
const senha = ref('')
const erro = ref('')

const authStore = useAuthStore()
const router = useRouter()
const notificacaoStore = useNotificacaoStore()

async function entrar() {
  erro.value = ''

  try {
    if (!email.value || !senha.value) {
      notificacaoStore.mostrar('Por favor, preencha e-mail e/ou senha.', 'Atenção', 'mdi-alert')
      return
    }
    await authStore.login(email.value, senha.value)

    router.push('/')

  } catch (e) {
    erro.value = e.message
  }
}
</script>