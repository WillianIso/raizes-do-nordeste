import acaraje from '../assets/acaraje.jpg'
import baiao_de_dois from '../assets/baiao_de_dois.jpg'
import carne_de_sol_com_macaxeira from '../assets/carne_de_sol_com_macaxeira.jpg'
import moqueca_baiana from '../assets/moqueca_baiana.jpg'
import bolo_de_rolo from '../assets/bolo_de_rolo.jpg'

export async function listarCardapio() {
  return [
    {
      id: 1,
      nome: 'Acarajé',
      descricao: 'Bolinho frito de feijão-fradinho recheado com vatapá e camarão',
      preco: 25.00,
      precoPromocional: 21.00,
      emPromocao: true,
      imagem: acaraje
    },
    {
      id: 2,
      nome: 'Baião de Dois',
      descricao: 'Arroz com feijão e carne seca',
      preco: 45.00,
      precoPromocional: 19.90,
      emPromocao: false,
      imagem: baiao_de_dois
    },
    {
      id: 3,
      nome: 'Carne de Sol com Macaxeira',
      descricao: 'Carne de sol desfiada com purê de macaxeira',
      preco: 30.00,
      precoPromocional: 20.90,
      imagem: carne_de_sol_com_macaxeira
    },
    {
      id: 4,
      nome: 'Moqueca Baiana',
      descricao: 'Peixe na cobertura de tomate e leite de coco',
      preco: 50.00,
      precoPromocional: 25.90,
      imagem: moqueca_baiana
    },
    {
      id: 5,
      nome: 'Bolo de Rolo',
      descricao: 'Doce típico pernambucano feito com massa fina e recheio de goiabada',
      preco: 15.00,
      precoPromocional: 10.00,
      emPromocao: true,
      imagem: bolo_de_rolo
    }
  ]
}