import express from 'express';
import { PostAdocao } from '../../controllers/adocaoController.js';

const routerAdocao = express.Router();

routerAdocao.post('/adocoes', PostAdocao);

export default routerAdocao;