import express from 'express';
import Animais from './animal/animal.js';
import adminAnimaisRoutes from './admin/animais.js';
import authRoutes from './auth.js';
import animalRoutes from '../routes/animal/animal.js';
import router from './animal/animal.js';

const router = express.Router();
   

    // Login
    router.use(authRoutes);

    // Rotas admin
    router.use(adminAnimaisRoutes);

    // Rotas animal
    router.use(animalRoutes);

    // Rotas gerais
    Animais(router);


export default router;