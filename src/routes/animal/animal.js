import express from 'express';
import { GetAnimais, PostAnimal, ExibirFoto} from '../../controllers/AnimaisController.js'
import { upload } from '../../middlewares/upload.js';


const routerAnimal = express.Router();

routerAnimal.post('/animais', upload.single('foto'), PostAnimal);
routerAnimal.get('/animais', GetAnimais);
routerAnimal.get('/animais/:id/foto/', ExibirFoto);

export default routerAnimal;

