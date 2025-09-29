//importa bcrypt para comparação de senha
import bcrypt from 'bcrypt';

//importa JWT para gerar tokens de autenticação
import jwt from 'jsonwebtoken';

//importa o model do usuário
import UsuarioModel from '../models/Usuario.js';

//importa a função de conexão com o banco
import { sequelize } from '../database/database.js';

//instancia o model corretamente com o Sequelize
const Usuario = UsuarioModel(sequelize);

export const login = async (req, res) => {
  try {

    //pega email e senha enviados pelo usuário
    const { email, senha } = req.body;

    //validação simples: se algum campo não foi enviado
    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha obrigatórios" });
    }

    //busca o usuário no banco pelo email
    const tutor = await Usuario.findOne({ where: { email } });

    //se não encontrar o usuário, retorna erro 401
    if (!tutor) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    //compara a senha digitada com o hash armazenado
    const senhaValida = await bcrypt.compare(senha, tutor.senha);

    //se a senha não bater, retorna erro 401
    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    //se o login estiver correto, gera um token JWT
    //coloca a chave secreta em uma variável de ambiente
    const token = jwt.sign(
      { id: tutor.id, email: tutor.email }, //dados dentro do token
      process.env.JWT_SECRET || 'MINHA_CHAVE_SECRETA', //chave secreta
      { expiresIn: '1h' } //validade de 1 hora
    );

    //retorna sucesso com token e id do usuário
    res.status(200).json({
      message: "Login bem-sucedido",
      tutorId: tutor.id,
      token
    });

  } catch (error) {
    //captura qualquer erro inesperado
    console.error(error);
    res.status(500).json({ error: "Erro interno ao tentar fazer login" });
  }
};
