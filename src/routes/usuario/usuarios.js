import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { getUsuarioLogado, exibirFotoUsuario, atualizarFotoUsuario } from '../controllers/usuarioController.js';
import { upload } from '../middlewares/upload.js';

const routerUsuario = express.Router();

routerUsuario.get('/usuarios/me', authMiddleware, getUsuarioLogado);
// se quiser que a foto seja pública, NÃO use authMiddleware aqui. Se for privada, mantenha.
routerUsuario.get('/usuarios/:id/foto', exibirFotoUsuario);

// endpoint protegido para atualizar a foto
routerUsuario.put('/usuarios/:id/foto', authMiddleware, upload.single('foto'), atualizarFotoUsuario);

export default routerUsuario;
