import express from 'express';
import { PostDoacao } from '../../controllers/doacaoController.js';

const doacaoRouter = express.Router();

doacaoRouter.post('/doacoes', PostDoacao);

export default doacaoRouter;
