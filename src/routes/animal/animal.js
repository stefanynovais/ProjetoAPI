import express from 'express';
import { GetAnimais, PostAnimais, GetAnimaisByID } from '../../controllers/AnimaisController';

const router = express.Router();

router.post('/animais', PostAnimais);
router.get('/animais', GetAnimais);
router.get('/animais/:id', GetAnimaisByID);

export default router;

