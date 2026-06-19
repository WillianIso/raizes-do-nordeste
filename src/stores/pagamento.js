import { defineStore } from 'pinia'

export const usePagamentoStore =
  defineStore('pagamento', {

    state: () => ({
      carregando: false,
      resultado: null
    }),

    actions: {

      iniciar() {
        this.carregando = true
      },

      finalizar(resultado) {
        this.carregando = false
        this.resultado = resultado
      }

    }

  })