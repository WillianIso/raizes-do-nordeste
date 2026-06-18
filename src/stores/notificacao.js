import { defineStore } from 'pinia'

export const useNotificacaoStore = defineStore('notificacao', {
  state: () => ({
    visivel: false,
    mensagem: ''
  }),

  actions: {
    mostrar(mensagem) {
      this.mensagem = mensagem
      this.visivel = true

      setTimeout(() => {
        this.visivel = false
      }, 2500)
    }
  }
})