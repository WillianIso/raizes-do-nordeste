<template>
  <v-container>
    <v-card>
      <v-card-title>
        Login
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="E-mail"
          v-model="email"
        />
        <v-text-field
          label="Senha"
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
    </v-card>
    <div class="mt-4">
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