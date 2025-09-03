import express from 'express';
import Animais from './animal/animal';
import adminAnimaisRoutes from './admin/animais.js';
import authRoutes from './auth.js';
import animalRoutes from '../routes/animal/animal.js';

const Routers = async () => {
    const port = 3000;
    const app = express();

    app.use(express.json());

    // Login
    app.use(authRoutes);

    // Rotas admin
    app.use(adminAnimaisRoutes);

    // Rotas animal
    app.use(animalRoutes)

    // Rotas gerais
    await Animais(app);

    app.listen(port, () => {
        console.log(`Aplicação rodando na porta ${port}`)
    });
}

export default Routers;