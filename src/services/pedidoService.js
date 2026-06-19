import { useFidelidadeStore } from '../stores/fidelidade'

const pedidos = []

export async function criarPedido(usuario, itens, total) {

  const pedido = {
    id: Date.now(),
    usuarioId: usuario.id,
    data: new Date(),
    status: 'RECEBIDO',
    itens: [...itens],
    total
  }

  pedidos.push(pedido)
    iniciarFluxoPedido(pedido)
  return pedido
}

export async function listarPedidos(usuarioId) {

  return pedidos.filter(
    pedido => pedido.usuarioId === usuarioId
  )
}

function iniciarFluxoPedido(pedido) {
    setTimeout(() => {
      pedido.status = 'EM_PREPARO'
    }, 1000)

    setTimeout(() => {
      pedido.status = 'SAIU_PARA_ENTREGA'
    }, 1000)

    setTimeout(() => {
      pedido.status = 'ENTREGUE'

      const fidelidadeStore =
        useFidelidadeStore()

      fidelidadeStore.registrarPedidoEntregue(
        contarPedidosEntregues(
          pedido.usuarioId
        )
      )
    }, 2000)
}

export function contarPedidosEntregues(
  usuarioId
) {

  console.log(pedidos)
  if (pedidos == null) return 0;
  return pedidos.filter(
    (p) =>
      p.usuarioId === usuarioId &&
      p.status === 'ENTREGUE'
  ).length
}