import express from 'express';
import routerAdm  from '../routes/admin/animais.js';
import authRoutes from '../routes/tutor/authLogin.js';
import routerAnimal from '../routes/animal/animal.js';
import routerAdocao from '../routes/adocao/adocaoRoutes.js';

const router = express.Router();

    // Login
    router.use(authRoutes);

    // Rotas admin
    router.use(routerAdm);

    // Rotas animal
    router.use(routerAnimal);

    // Rota adoção
    router.use(routerAdocao);

export default router;
