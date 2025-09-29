import Usuario from '../models/Usuario.js';

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    //validação simples
    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha obrigatórios" });
    }

    //procura o usuário no banco
    const tutor = await Usuario.findOne({ where: { email } });

    //verifica se existe e se a senha bate
    if (!tutor || tutor.senha !== senha) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    //sucesso
    res.status(200).json({ message: "Login bem-sucedido", tutorId: tutor.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao tentar fazer login" });
  }
};