import { listarCardapio } from './menuService'

export async function listarPromocoes() {

  const produtos = await listarCardapio()

  return produtos.filter(produto => produto.emPromocao)
}