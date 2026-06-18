<template>
  <v-container>
    <h1 class="text-center">Promoções</h1>
    <v-row>
      <v-col cols="12" v-for="campanha in campanhas" :key="campanha.id">
        <v-alert type="success" class="mb-4" :title="campanha.titulo">
          {{ campanha.descricao }} |
          Válido até: {{ campanha.validade }}

        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" v-for="produto in produtos" :key="produto.id">
        <CardPadrao>
          <v-img :src="produto.imagem"  class="ma-2 imagem-arredondada"  />
          <v-card-title>
            {{ produto.nome }}
          </v-card-title>
          <v-card-text>
            {{ produto.descricao }}
            <br><br>
            <span>
              De:
              <s>
                R$
                {{ produto.preco.toFixed(2) }}
              </s>
            </span>
            <br>
            <strong>
              Por:
              R$
              {{
                produto
                  .precoPromocional
                  .toFixed(2)
              }}
            </strong>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" block @click="adicionar(produto)">
              Aproveitar Oferta
            </v-btn>
          </v-card-actions>
        </CardPadrao>
      </v-col>

    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { listarPromocoes } from '../services/promocaoService'
import { listarCampanhas }  from '../services/campanhaService'
import { useNotificacaoStore } from '../stores/notificacao'
import { useCarrinhoStore } from '../stores/carrinho'
import CardPadrao from '../components/CardPadrao.vue'

const produtos = ref([])
const campanhas = ref([])
const notificacaoStore = useNotificacaoStore()
const carrinhoStore = useCarrinhoStore()

onMounted(async () => {
  produtos.value = await listarPromocoes()
  campanhas.value = await listarCampanhas()
})

function adicionar(produto) {
  carrinhoStore.adicionar({
    ...produto, 
    preco: produto.emPromocao ? produto.precoPromocional : produto.preco
  });

  notificacaoStore.mostrar(`${produto.nome} adicionado ao carrinho!`, "Sucesso", "mdi-check-circle")
}
</script>