import { defineStore } from 'pinia'
import { useFidelidadeStore } from './fidelidade'

export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    itens: [],
    usarDesconto: false,
    incluirRefrigerante: false
  }),

  getters: {
    subtotal: state =>
      state.itens.reduce(
        (total, item) =>
          total + item.preco * item.quantidade,
        0
      ),

    total: state => {
      const subtotal = state.subtotal
      const descontoAplicado =
        state.usarDesconto && subtotal >= 50
          ? 50
          : 0

      return Math.max(subtotal - descontoAplicado, 0)
    },

    itensComBeneficios: state => {
      const itens = [...state.itens]

      if (state.incluirRefrigerante) {
        itens.push({
          id: 'refrigerante-gratis',
          nome: 'Refrigerante 2L (Brinde)',
          quantidade: 1,
          preco: 0
        })
      }

      return itens
    }
  },

  actions: {
    adicionar(produto) {
      const existente =
        this.itens.find(i => i.id === produto.id)

      if (existente) {
        existente.quantidade++
        return
      }

      this.itens.push({
        ...produto,
        quantidade: 1
      })
    },

    remover(id) {
      this.itens =
        this.itens.filter(i => i.id !== id)
    },

    setDescontoUsado(valor) {
      if (!valor || this.subtotal < 50) {
        this.usarDesconto = false
        return
      }

      this.usarDesconto = true
    },

    setRefrigeranteUsado(valor) {
      this.incluirRefrigerante = Boolean(valor)
    },

    confirmarBeneficios() {
      const fidelidadeStore = useFidelidadeStore()

      if (this.usarDesconto && this.subtotal >= 50) {
        fidelidadeStore.usarDesconto()
      }

      if (this.incluirRefrigerante) {
        fidelidadeStore.usarRefrigerante()
      }
    },

    limpar() {
      this.itens = []
      this.usarDesconto = false
      this.incluirRefrigerante = false
    }
  }
})