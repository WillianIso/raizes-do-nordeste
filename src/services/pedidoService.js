import { useFidelidadeStore } from '../stores/fidelidade'

const pedidos = []

export async function criarPedido(usuario, itens, total, metodo) {

  const pedido = {
    id: Date.now(),
    usuarioId: usuario.id,
    data: new Date(),
    status: 'RECEBIDO',
    itens: [...itens],
    total,
    pagamento: {
      metodo: metodo.metodo,
      status: metodo.codigo,
      transacaoId: metodo.transacaoId,
      data: metodo.data
    },
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
  if (pedido.pagamento.status == 'PAGAMENTO APROVADO') {
    setTimeout(() => {
      pedido.status = 'RECEBIDO'
    }, 5000)

    setTimeout(() => {
      pedido.status = 'EM_PREPARO'
    }, 5000)

    setTimeout(() => {
      pedido.status = 'SAIU_PARA_ENTREGA'
    }, 10000)

    setTimeout(() => {
      pedido.status = 'ENTREGUE'

      const fidelidadeStore =
        useFidelidadeStore()

      fidelidadeStore.registrarPedidoEntregue(
        contarPedidosEntregues(
          pedido.usuarioId
        )
      )
    }, 25000)
  } else {
    pedido.status = 'PAGAMENTO_RECUSADO'
  }
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