<template>
  <v-container>
    <v-card>
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
                @click.prevent="mostrarTermos = true"
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
                @click.prevent="mostrarLgpd = true"
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

    </v-card>
    <div class="mt-4">
      Já tem uma conta?
      <router-link to="/">
        Entrar
      </router-link>
    </div>

    <v-dialog
      v-model="mostrarTermos"
      max-width="700"
    >
      <v-card>
        <v-card-title>
          Termos de Uso e Política de Privacidade
        </v-card-title>
        <v-card-text>
          <p>
            Este aplicativo permite a realização de pedidos online
            junto à lanchonete.
          </p>
          <p>
            Ao utilizar a plataforma, você concorda em fornecer
            informações verdadeiras e manter seus dados atualizados.
          </p>
          <p>
            Seus dados serão utilizados exclusivamente para
            identificação, processamento de pedidos, entrega
            e comunicação relacionada aos serviços oferecidos.
          </p>
          <p>
            Não compartilharemos seus dados com terceiros
            sem base legal ou consentimento.
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="mostrarTermos = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="mostrarLgpd"
      max-width="700"
    >
      <v-card>
        <v-card-title>
          Tratamento de Dados Pessoais (LGPD)
        </v-card-title>
        <v-card-text>

          <p>
            Seus dados pessoais serão tratados de acordo com a
            Lei nº 13.709/2018 (LGPD).
          </p>
          <p>
            Os dados coletados poderão incluir:
          </p>
          <ul>
            <li>Nome</li>
            <li>E-mail</li>
            <li>Telefone</li>
            <li>Histórico de pedidos</li>
          </ul>
          <p>
            Os dados serão utilizados para:
          </p>
          <ul>
            <li>Processamento de pedidos</li>
            <li>Entrega de produtos</li>
            <li>Atendimento ao cliente</li>
            <li>Comunicações autorizadas pelo usuário</li>
          </ul>
          <p>
            Você poderá solicitar correção, exclusão ou acesso aos seus
            dados a qualquer momento.
          </p>

        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            @click="mostrarLgpd = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { cadastrar } from '../services/authService'
import { useNotificacaoStore } from '../stores/notificacao'

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
    notificacaoStore.mostrar('Você precisa aceitar os Termos de Uso')
    return;
  }

  if (!aceitouLgpd.value) {
    notificacaoStore.mostrar('Você precisa autorizar o tratamento dos dados')
    return;
  }

  if (!nome.value || !email.value || !telefone.value || !senha.value) {
    notificacaoStore.mostrar('Preencha todos os campos obrigatórios')
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
</script>