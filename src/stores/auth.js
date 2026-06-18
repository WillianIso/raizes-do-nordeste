import { defineStore } from 'pinia'
import * as authService from '../services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: JSON.parse(localStorage.getItem('usuario')),
    loading: false
  }),

  getters: {
    autenticado: state => !!state.usuario
  },

  actions: {
    async login(email, senha) {
      try {
        this.loading = true

        const usuario = await authService.login(
          email,
          senha
        )

        this.usuario = usuario

        localStorage.setItem(
          'usuario',
          JSON.stringify(usuario)
        )

      } finally {
        this.loading = false
      }
    },

    logout() {
      this.usuario = null
      localStorage.removeItem('usuario')
    }
  }
})