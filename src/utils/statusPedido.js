export function descricaoStatus(status) {

  const mapa = {
    RECEBIDO: 'Pedido recebido',
    EM_PREPARO: 'Em preparo',
    SAIU_PARA_ENTREGA: 'Saiu para entrega',
    ENTREGUE: 'Entregue',
    PAGAMENTO_RECUSADO: 'Pagamento Recusado'
  }

  return mapa[status]
}