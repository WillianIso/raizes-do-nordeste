const campanhas = [
    {
        id: 1,
        titulo: 'Combo da Semana',
        descricao:'Todos as sobremesas com 5 reais de desconto',
        validade:'29/06/2026'
    }
]

export async function listarCampanhas() {
  return campanhas
}