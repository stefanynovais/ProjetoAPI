import express from 'express';
import { listarAnimais, atualizarAnimal, deletarAnimal, getAnimalPorID } from '../../controllers/adminAnimaisController.js';
import authAdmin from '../../middlewares/authAdmin.js';

const routerAdm = express.Router();

routerAdm.get('/animais/:id', authAdmin, getAnimalPorID);
routerAdm.get('/admin/animais', authAdmin, listarAnimais);
routerAdm.patch('/admin/animais/:id', authAdmin, atualizarAnimal);
routerAdm.delete('/admin/animais/:id', authAdmin, deletarAnimal);

export default routerAdm;
