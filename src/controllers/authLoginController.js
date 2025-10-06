//importa bcrypt para comparação de senha
import bcrypt from 'bcrypt';

//importa JWT para gerar tokens de autenticação
import jwt from 'jsonwebtoken';

//importa o model do usuário
import Usuario from '../models/Usuario.js';

//importa a função de conexão com o banco
import  {sequelize}  from '../database/database.js';



export const Login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha obrigatórios" });
    }

    const tutor = await Usuario.findOne({ where: { email } });

    console.log("Usuário encontrado:", tutor ? tutor.email : null);
    if (!tutor) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, tutor.senha);
    console.log("Senha válida?", senhaValida);

    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
      { id: tutor.id, email: tutor.email },
      process.env.JWT_SECRET || 'MINHA_CHAVE_SECRETA',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login bem-sucedido",
      tutorId: tutor.id,
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao tentar fazer login" });
  }
};

