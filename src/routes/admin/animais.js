import express from 'express';
import { GetAnimais, PatchAnimal, DeleteAnimal, GetAnimalPorID } from '../../controllers/adminAnimaisController.js';
import authAdmin from '../../middlewares/authAdmin.js';

const routerAdm = express.Router();

routerAdm.get('/admin/animais/:id', authAdmin, GetAnimalPorID);
routerAdm.get('/admin/animais', authAdmin, GetAnimais);
routerAdm.patch('/admin/animais/:id', authAdmin, PatchAnimal);
routerAdm.delete('/admin/animais/:id', authAdmin, DeleteAnimal);

export default routerAdm;
