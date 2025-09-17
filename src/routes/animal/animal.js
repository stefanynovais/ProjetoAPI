import express from 'express';
import { GetAnimais, PostAnimais, GetAnimaisByID } from '../../controllers/AnimaisController.js';

const routerAnimal = express.Router();

routerAnimal.post('/animais', PostAnimais);
routerAnimal.get('/animais', GetAnimais);

export default routerAnimal;

