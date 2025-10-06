import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';

export async function AdminLogin(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    // Verifica se é admin
    if (!usuario.administrador) {
      return res.status(403).json({ erro: 'Acesso restrito a administradores' });
    }

    const secretKey = 'sua-chave-secreta'; // a mesma usada no seed

    // Compara senha com bcrypt
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    } else {
      console.log("ok");
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        administrador: usuario.administrador // pega o valor do banco
      },
      secretKey,
      { expiresIn: '2h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no login'});
  }
}
