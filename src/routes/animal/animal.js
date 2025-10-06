import express from 'express';
import { GetAnimais, PostAnimais, exibirFoto} from '../../controllers/AnimaisController.js';


const routerAnimal = express.Router();

routerAnimal.post('/animais', PostAnimais);
routerAnimal.get('/animais', GetAnimais);
routerAnimal.get('/animais/:id/foto/', exibirFoto);

export default routerAnimal;

