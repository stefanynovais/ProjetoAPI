import express from 'express';
import  routerAdm  from '../routes/admin/animais.js';
import authRoutes from '../routes/tutor/authLogin.js';
import animalRoutes from '../routes/animal/animal.js';
import routerAnimal from '../routes/animal/animal.js';

const router = express.Router();

    // Login
    router.use(authRoutes);

    // Rotas admin
    router.use(routerAdm);

    // Rotas animal
    router.use(routerAnimal);

export default router;