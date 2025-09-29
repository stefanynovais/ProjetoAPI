import express from 'express';
import { GetAnimais, PostAnimais} from '../../controllers/AnimaisController.js';
import upload from '../../middlewares/upload.js'; 

const routerAnimal = express.Router();

routerAnimal.post('/animais', upload.single('foto'), PostAnimais);
routerAnimal.get('/animais', GetAnimais);

export default routerAnimal;

