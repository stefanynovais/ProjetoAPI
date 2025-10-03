import express from 'express';
import routerAdm  from '../routes/admin/animais.js';
import routerLogin from '../routes/tutor/authLogin.js';
import routerAnimal from '../routes/animal/animal.js';
import routerAdocao from '../routes/adocao/adocaoRoutes.js';
import routerQuestionario from '../routes/tutor/questionario.js';
import routerDoacao from '../routes/doacao/doacao.js';
import tutorRoutes from '../routes/tutor/tutor.js';

const router = express.Router();

    // Login
    router.use(routerLogin);

    // Rotas admin
    router.use(routerAdm);

    // Rotas animal
    router.use(routerAnimal);

    // Rota adoção
    router.use(routerAdocao);

    // Rota doação
    router.use(routerDoacao);

    //Rota questionario
    router.use(routerQuestionario);

    //Rota Tutor
    router.use(tutorRoutes);
    
export default router;
