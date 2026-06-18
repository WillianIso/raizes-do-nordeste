<template>
  <v-container class="d-flex flex-column align-center justify-center" >
    <CardPadrao class="mx-auto" width="350">
      <v-card-title>
        Criar Conta
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="nome"
          label="Nome Completo*"
        />
        <v-text-field
          v-model="email"
          label="E-mail*"
          type="email"
        />
        <v-text-field
          v-model="telefone"
          label="Telefone*"
        />

        <v-text-field
          v-model="senha"
          label="Senha*"
          type="password"
        />
        <v-checkbox
          v-model="aceitouTermos"
        >
          <template #label>
            <span>
              Li e concordo com os
              <a
                href="#"
                @click.prevent="mostrarNotificacaoTermoUso()"
              >
                Termos de Uso
              </a>
              e a Política de Privacidade
            </span>
          </template>
        </v-checkbox>
        <v-checkbox
          v-model="aceitouLgpd"
        >
          <template #label>
            <span>
              Autorizo o tratamento dos meus dados pessoais conforme a
              <a
                href="#"
                @click.prevent="mostrarNotificacaoLgpd()"
              >
                LGPD
              </a>
            </span>
          </template>
        </v-checkbox>
        <v-checkbox
          v-model="aceitaOfertas"
          label="Aceito receber ofertas por e-mail (opcional)"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="primary"
          block
          @click="cadastrarUsuario"
        >
          Cadastrar
        </v-btn>

      </v-card-actions>

    </CardPadrao>
    <div class="mt-4 text-center">
      Já tem uma conta?
      <router-link to="/">
        Entrar
      </router-link>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { cadastrar } from '../services/authService'
import { useNotificacaoStore } from '../stores/notificacao'
import CardPadrao from '../components/CardPadrao.vue'

const router = useRouter()
const notificacaoStore = useNotificacaoStore()

const nome = ref('')
const email = ref('')
const telefone = ref('')
const senha = ref('')

const aceitouTermos = ref(false)
const aceitouLgpd = ref(false)
const aceitaOfertas = ref(false)

const mostrarTermos = ref(false)
const mostrarLgpd = ref(false)

function cadastrarUsuario() {

  if (!aceitouTermos.value) {
    notificacaoStore.mostrar('Você precisa aceitar os Termos de Uso', "Atenção", "mdi-alert")
    return;
  }

  if (!aceitouLgpd.value) {
    notificacaoStore.mostrar('Você precisa autorizar o tratamento dos dados', "Atenção", "mdi-alert")
    return;
  }

  if (!nome.value || !email.value || !telefone.value || !senha.value) {
    notificacaoStore.mostrar('Preencha todos os campos obrigatórios', "Atenção", "mdi-alert")
    return;
  }

  const novoUsuario = {
    nome: nome.value,
    email: email.value,
    telefone: telefone.value,
    senha: senha.value,
    perfil: 'cliente',
    aceitaOfertas: aceitaOfertas.value
  }

    cadastrar(novoUsuario)


  router.push('/')
}

function mostrarNotificacaoTermoUso() {
  notificacaoStore.mostrar(
    'Ao aceitar os Termos de Uso, você concorda em fornecer informações verdadeiras e manter seus dados atualizados. ' +
    'Seus dados serão utilizados exclusivamente para identificação, processamento de pedidos, entrega e comunicação ' +
    'relacionada aos serviços oferecidos. Não compartilharemos seus dados com terceiros sem base legal ou consentimento.',
    "Termos de Uso",
    "mdi-file-document"
  )
}

function mostrarNotificacaoLgpd() {
  notificacaoStore.mostrar(
    'Seus dados pessoais serão tratados de acordo com a Lei nº 13.709/2018 (LGPD). Os dados coletados poderão incluir: ' +
    'Nome, E-mail, Telefone, Histórico de pedidos. Os dados serão utilizados para: Processamento de pedidos, ' +
    'Entrega de produtos, Atendimento ao cliente, Comunicações autorizadas pelo usuário. Você poderá solicitar correção,' +
    ' exclusão ou acesso aos seus dados a qualquer momento.',
    "Tratamento de Dados Pessoais (LGPD)",
    "mdi-file-document"
  )
}
</script>