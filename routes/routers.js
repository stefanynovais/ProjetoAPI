import express from 'express';
import Animais from './animal/animal';
import adminAnimaisRoutes from './admin/animais.js';
import authRoutes from './auth.js';

const Routers = async () => {
    const port = 3000;
    const app = express();

    app.use(express.json());

    // Login
    app.use(authRoutes);

    // Rotas admin
    app.use(adminAnimaisRoutes);

    // Rotas gerais
    await Animais(app);

    app.listen(port, () => {
        console.log(`Aplicação rodando na porta ${port}`)
    });
}

export default Routers;