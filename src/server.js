import cors from 'cors';
import express from 'express';
import { connectDatabase} from './database/database.js';
import router from './routes/routers.js';
// import { initModels } from './models/Modelos.js';



const app = express(); //criando a aplicação do nosso app
const port = 3000; //porta em que o servidor vai rodar

app.use(express.json()); //dizendo ao Express para interpretar JSON no corpo das requisições

//configuração do CORS
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST'],
  credentials: true
})); 

// Conecta ao banco de dados
await connectDatabase();

// await initModels();

// Rotas
app.use('/', router); // importa todas as outras rotas

// Rota teste para ver se o servidor está funcionando
app.get('/', (req,res) => res.send('Bem-vindo à API de Adoção!'));

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));