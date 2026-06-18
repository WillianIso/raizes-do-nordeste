const usuarios = [
  {
    id: 1,
    email: 'admin@teste.com',
    senha: '123456',
    nome: 'Gerente',
    perfil: 'admin'
  },
  {
    id: 1,
    email: 'cliente@teste.com',
    senha: '123456',
    nome: 'Cliente 1',
    perfil: 'cliente',
    aceitaOfertas: false,
  },
  {
    id: 1,
    email: 'atendente@teste.com',
    senha: '123456',
    nome: 'Atendente',
    perfil: 'atendente'
  }
]

export async function login(email, senha) {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const usuario = usuarios.find(
    u => u.email === email && u.senha === senha
  )

  if (!usuario) {
    throw new Error('Usuário ou senha inválidos')
  }

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    perfil: usuario.perfil,
    token: 'jwt-token'
  }
}

export async function cadastrar(novoUsuario) {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const usuario = usuarios.find(
    u => u.email === novoUsuario.email && u.senha === novoUsuario.senha
  )

  if (usuario) {
    throw new Error('Usuário já existe!')
  }

  usuarios.push(novoUsuario)
}