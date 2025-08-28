import jwt from 'jsonwebtoken';
import encrypt from 'encryptjs';
import UsuarioModel from '../models/Usuario.js';
import sequelize from '../database/database.js';

const Usuario = UsuarioModel(sequelize);

export async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const secretKey = 'sua-chave-secreta'; // a mesma usada no seed
    const senhaDescriptografada = encrypt.decrypt(usuario.senha, secretKey, 256);

    if (senha !== senhaDescriptografada) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role || 'user' // certifique-se que admins tenham 'admin' no banco
      },
      secretKey,
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ erro: 'Erro no login' });
  }
}
