// Importa bcrypt para comparação de senha
import bcrypt from 'bcrypt';
// Importa JWT para gerar tokens de autenticação
import jwt from 'jsonwebtoken';
// Importa o model do usuário
import UsuarioModel from '../models/Usuario.js';
// Importa a função de conexão com o banco
import { sequelize } from '../database/database.js';

// Instancia o model corretamente com o Sequelize
const Usuario = UsuarioModel(sequelize);

export const login = async (req, res) => {
  try {
    // Pega email e senha enviados pelo usuário
    const { email, senha } = req.body;

    // Validação simples: se algum campo não foi enviado
    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha obrigatórios" });
    }

    // Busca o usuário no banco pelo email
    const tutor = await Usuario.findOne({ where: { email } });

    // Se não encontrar o usuário, retorna erro 401
    if (!tutor) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    // Compara a senha digitada com o hash armazenado
    const senhaValida = await bcrypt.compare(senha, tutor.senha);

    // Se a senha não bater, retorna erro 401
    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    // Se o login estiver correto, gera um token JWT
    const token = jwt.sign(
      { id: tutor.id, email: tutor.email }, // dados dentro do token
      'MINHA_CHAVE_SECRETA',               // chave secreta (colocar em variável de ambiente)
      { expiresIn: '1h' }                  // validade de 1 hora
    );

    // Retorna sucesso com token
    res.status(200).json({ message: "Login bem-sucedido", token });

  } catch (error) {
    // Se der algum erro, retorna 500
    console.error(error);
    res.status(500).json({ error: "Erro interno ao tentar fazer login" });
  }
};