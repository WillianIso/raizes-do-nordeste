import { defineStore } from 'pinia'

export const useFidelidadeStore = defineStore(
  'fidelidade',
  {
    state: () => ({
      pedidosEntregues: 0,
      refrigerantesDisponiveis: 0,
      descontosDisponiveis: 0
    }),

    actions: {
      registrarPedidoEntregue(totalPedidosEntregues) {
        this.pedidosEntregues = totalPedidosEntregues

        if (totalPedidosEntregues % 2 === 0) {
          this.refrigerantesDisponiveis++
        }

        if (totalPedidosEntregues % 3 === 0) {
          this.descontosDisponiveis++
        }
      },

      usarRefrigerante() {
        if (
          this.refrigerantesDisponiveis > 0
        ) {
          this.refrigerantesDisponiveis--
          this.pedidosEntregues = 0
          return true
        }

        return false
      },

      usarDesconto() {
        if (
          this.descontosDisponiveis > 0
        ) {
          this.descontosDisponiveis--
          this.pedidosEntregues = 0
          return true
        }

        return false
      }
    }
  }
)