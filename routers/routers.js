import bodyParser from 'body-parser';
import express from 'express';
import Animais from './animal/animal';

const Routers = async () => {
    const port = 3000;
    const app = express();
    await Animais(app);
    app.use(bodyParser.json());

    app.listen(port, () => {
        console.log(`Aplicação rodando na porta ${port}`)
    });
}

export default Routers;