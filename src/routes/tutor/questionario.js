import express from 'express';
import { criarQuestionario } from '../../controllers/questionarioController.js';

const router = express.Router();

router.post('/questionario', criarQuestionario);

export default router;