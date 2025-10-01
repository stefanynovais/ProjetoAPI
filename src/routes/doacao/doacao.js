import express from 'express';
import { PostAdocao } from '../../controllers/adocaoController.js';

const doacaoRouter = express.Router();

doacaoRouter.post('/doacoes', PostAdocao);

export default doacaoRouter;
