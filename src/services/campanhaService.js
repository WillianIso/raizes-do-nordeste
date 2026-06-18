const campanhas = [
    {
        id: 1,
        titulo: 'Combo da Semana',
        descricao:'Todos as sobremesas com 10 reais de desconto',
        validade:'29/06/2026'
    }
]

export async function listarCampanhas() {
  return campanhas
}