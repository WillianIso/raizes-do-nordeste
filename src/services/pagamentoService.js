export async function processarPagamento(
  metodo,
  valor
) {

  await new Promise(resolve =>
    setTimeout(resolve, 3000)
  )

  const sucesso =
    Math.random() > 0.15

  if (!sucesso) {

    return {
      sucesso: false,
      codigo: 'PAGAMENTO_NEGADO',
      mensagem:
        'Pagamento não autorizado'
    }

  }

  return {
    sucesso: true,
    codigo: 'PAGAMENTO APROVADO',
    transacaoId:
      crypto.randomUUID(),
    metodo,
    valor,
    data: new Date()
  }

}