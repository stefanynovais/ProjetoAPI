import express from 'express';
import Usuario from '../../models/Usuario.js'; 
import { login } from '../../controllers/authLoginController.js';

const router = express.Router();

//chamando o controller
router.post('/autenticacao', login);

export default router;
