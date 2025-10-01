import jwt from 'jsonwebtoken';
import  {sequelize}  from '../database/database.js';
import Usuario from '../models/Usuario.js';


export default async function authAdmin(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, 'sua-chave-secreta'); // mesma chave usada no login/seed

    const usuario = await Usuario.findByPk(decoded.id);
    if (!usuario || usuario.administrador !== true) {
      return res.status(403).json({ erro: 'Apenas administradores podem acessar esta rota' });
    }

    req.user = usuario;
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}
