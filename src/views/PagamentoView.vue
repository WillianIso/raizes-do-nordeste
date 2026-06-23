<template>
  <v-container>
    <h1 class="text-center">Pagamento</h1>

    <v-radio-group v-model="metodo" @update:model-value="selecionarMetodo">
      <v-radio label="PIX" value="PIX" />
      <v-radio label="Cartão de Crédito" value="CARTAO_CREDITO" />
      <v-radio label="Cartão de Débito" value="CARTAO_DEBITO" />
      <v-radio label="Dinheiro" value="DINHEIRO" />
      <v-radio label="Pagar no Caixa" value="CAIXA" />
    </v-radio-group>

    <v-btn color="success" block @click="confirmarPagamento">
      Pagar
    </v-btn>

    <PagamentoProcessandoModal />
    <PagamentoSucessoModal />

    <v-dialog v-model="modalPix" max-width="420">
      <CardPadrao>
        <v-card-title class="text-center">
          Pagar com PIX
        </v-card-title>

        <v-card-text class="text-center">
          <div class="mx-auto mb-4">
            <v-img :src="qrcode" width="200" class="mx-auto" />
          </div>

          <div class="text-caption text-medium-emphasis">
            Chave PIX
          </div>

          <div class="d-flex align-center justify-center ga-2 font-weight-medium">
            <span>{{ pixKey }}</span>

            <v-btn icon size="small" @click="copiarPix">
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
          </div>

          <!-- Timer -->
          <div class="mt-4 text-error font-weight-medium">
            Expira em: {{ tempoFormatado }}
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="secondary" @click="fecharModal">
            Cancelar
          </v-btn>
          <v-btn color="primary" @click="confirmarPagamento">
            Confirmar pagamento
          </v-btn>
        </v-card-actions>
      </CardPadrao>
    </v-dialog>

    <v-dialog v-model="modalCartao" max-width="520">
      <CardPadrao>
        <v-card-title class="text-center">
          Dados do Cartão
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="confirmarPagamento">
            <v-text-field variant="outlined" v-model="cartao.nome" label="Nome no cartão" required />
            <v-text-field variant="outlined" v-model="cartao.numero" label="Número do cartão" type="text"
              inputmode="numeric" @input="aplicarMascaraCartao" required />
            <v-text-field variant="outlined" v-model="cartao.validade" label="Validade" placeholder="MM/AA" type="text"
              inputmode="numeric" @input="aplicarMascaraValidade" required />
            <v-text-field variant="outlined" v-model="cartao.cvc" label="CVC" type="text" inputmode="numeric"
              @input="aplicarMascaraCvc" required />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="secondary" @click="modalCartao = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" @click="confirmarPagamento">
            Confirmar pagamento
          </v-btn>
        </v-card-actions>
      </CardPadrao>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, watch, onBeforeUnmount, computed } from 'vue'
import { processarPagamento } from '../services/pagamentoService.js'
import { criarPedido } from '../services/pedidoService.js'
import { usePagamentoStore } from '../stores/pagamento.js'
import { useCarrinhoStore } from '../stores/carrinho.js'
import { useNotificacaoStore } from '../stores/notificacao.js'
import { useAuthStore } from '../stores/auth.js'
import CardPadrao from '../components/CardPadrao.vue'
import PagamentoProcessandoModal from '../components/PagamentoProcessandoModal.vue'
import PagamentoSucessoModal from '../components/PagamentoSucessoModal.vue'
import qrcode from '../assets/qrcodepagamento.png'

const metodo = ref('DINHEIRO')
const pagamentoStore = usePagamentoStore()
const carrinhoStore = useCarrinhoStore()
const notificacaoStore = useNotificacaoStore()
const authStore = useAuthStore()

const modalPix = ref(false)
const modalCartao = ref(false)
const pixKey = ref('raizesnordestelanches@gmail.com')
const tempoRestante = ref(60) // 1 minuto
let interval = null

const cartao = ref({
  nome: '',
  numero: '',
  validade: '',
  cvc: ''
})

const tempoFormatado = computed(() => {
  const min = String(Math.floor(tempoRestante.value / 60)).padStart(2, '0')
  const seg = String(tempoRestante.value % 60).padStart(2, '0')
  return `${min}:${seg}`
})

watch(modalPix, (novo) => {
  if (novo) {
    iniciarTimer()
  } else {
    clearInterval(interval)
  }
})

onBeforeUnmount(() => {
  clearInterval(interval)
})

function aplicarMascaraCartao(event) {
  const numeros = event.target.value.replace(/\D/g, '').slice(0, 16)
  cartao.value.numero = numeros.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

function aplicarMascaraValidade(event) {
  const numeros = event.target.value.replace(/\D/g, '').slice(0, 4)

  if (numeros.length <= 2) {
    cartao.value.validade = numeros
    return
  }

  cartao.value.validade = `${numeros.slice(0, 2)}/${numeros.slice(2)}`
}

function aplicarMascaraCvc(event) {
  cartao.value.cvc = event.target.value.replace(/\D/g, '').slice(0, 4)
}

function abrirModalPorMetodo() {
  if (metodo.value === 'PIX') {
    modalPix.value = true
    return
  }

  if (metodo.value === 'CARTAO_CREDITO' || metodo.value === 'CARTAO_DEBITO') {
    modalCartao.value = true
  }
}

async function confirmarPagamento() {
  pagamentoStore.iniciar()

  const resultado = await processarPagamento(metodo.value, carrinhoStore.total)

  pagamentoStore.finalizar(resultado)

  if (!resultado.sucesso) {
    notificacaoStore.mostrar(resultado.mensagem, 'Erro', 'mdi-close-circle')
    return
  }

  carrinhoStore.confirmarBeneficios()

  await criarPedido(
    authStore.usuario,
    carrinhoStore.itensComBeneficios,
    carrinhoStore.total,
    resultado
  )

  carrinhoStore.limpar()
}

function selecionarMetodo() {
  if (metodo.value === 'DINHEIRO') {
    return
  }

  abrirModalPorMetodo()
}

function copiarPix() {
  navigator.clipboard.writeText(pixKey.value)
}

function iniciarTimer() {
  clearInterval(interval)
  tempoRestante.value = 60

  interval = setInterval(() => {
    tempoRestante.value--

    if (tempoRestante.value <= 0) {
      expirarPix()
    }
  }, 1000)
}

function expirarPix() {
  clearInterval(interval)
  modalPix.value = false
}

function fecharModal() {
  clearInterval(interval)
  modalPix.value = false
}
</script>
