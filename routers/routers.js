import bodyParser from 'body-parser';
import express from 'express';

const Routers = async () => {
    const port = 3000;
    const app = express();
    app.use(bodyParser.json());

    app.listen(port, () => {
        console.log(`Aplicação rodando na porta ${port}`)
    });
}

export default Routers;