<template>

  <v-row>
    <v-col cols="12" v-for="produto in categorias" :key="produto.id">
      <v-card>
        <v-img :src="produto.imagem" height="200" />
        <v-card-title>
          {{ produto.nome }}
        </v-card-title>
        <v-card-text>
          {{ produto.descricao }}
          <br>
          <div v-if="produto.emPromocao">
            <span>
              De:
              <s>
                R$
                {{ produto.preco.toFixed(2) }}
              </s>
            </span>
            <br>
            <strong>
              R$ {{ produto.precoPromocional.toFixed(2) }}
            </strong>
          </div>
          <div v-if="!produto.emPromocao">
            <strong>
              R$ {{ produto.preco.toFixed(2) }}
            </strong>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="adicionar(produto)">
            Adicionar ao Carrinho
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { listarCardapio } from '../services/menuService';
import { useAuthStore } from '../stores/auth';
import { useNotificacaoStore } from '../stores/notificacao'

const categorias = ref([]);
const carregando = ref(true);

const authStore = useAuthStore();
const notificacaoStore = useNotificacaoStore()

function adicionar(item) {

  if (authStore.usuario.perfil !== 'cliente') {
    alert('Somente clientes podem realizar pedidos.');
    return;
  }

  notificacaoStore.mostrar(`${item.nome} adicionado ao carrinho`)
}

onMounted(async () => {
  categorias.value = await listarCardapio();
  carregando.value = false;
});

function formatarPreco(preco) {
  return preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}
</script>