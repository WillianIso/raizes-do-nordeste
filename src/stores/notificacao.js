import { defineStore } from 'pinia'

export const useNotificacaoStore = defineStore('notificacao', {
  state: () => ({
    visivel: false,
    mensagem: '',
    titulo: '',
    icone: ''
  }),

  actions: {
    mostrar(mensagem, titulo, icone) {
      this.mensagem = mensagem
      this.titulo = titulo
      this.icone = icone
      this.visivel = true
    }
  }
})