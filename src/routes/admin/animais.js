import express from 'express';
import { listarAnimais, atualizarAnimal, deletarAnimal } from '../../controllers/adminAnimaisController.js';
import authAdmin from '../../middlewares/authAdmin.js';

const router = express.Router();

router.get('/admin/animais', authAdmin, listarAnimais);
router.patch('/admin/animais/:id', authAdmin, atualizarAnimal);
router.delete('/admin/animais/:id', authAdmin, deletarAnimal);

export default router;
