import express from 'express';
import { PostQuestionario } from '../../controllers/questionarioController.js';

const router = express.Router();

router.post('/questionario', PostQuestionario);

export default router;