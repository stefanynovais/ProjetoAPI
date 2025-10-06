import express from 'express';
import { GetAnimais, PostAnimais, exibirFoto} from '../../controllers/AnimaisController.js'
import { upload } from '../../middlewares/upload.js';


const routerAnimal = express.Router();

routerAnimal.post('/animais', upload.single(foto), PostAnimais);
routerAnimal.get('/animais', GetAnimais);
routerAnimal.get('/animais/:id/foto/', exibirFoto);

export default routerAnimal;

