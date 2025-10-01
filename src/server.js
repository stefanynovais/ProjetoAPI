import express from 'express';
import {sequelize, connectDatabase} from './database/database.js';
import router from './routes/routers.js';
import tutorRoutes from './routes/tutor/tutor.js';
import authRoutes from './routes/tutor/authLogin.js';

const app = express(); //criando a aplicação do nosso app
const port = 3000; //porta em que o servidor vai rodar

app.use(express.json()); //dizendo ao Express para interpretar JSON no corpo das requisições

// Conecta ao banco de dados
await connectDatabase();

// Rotas
app.use(tutorRoutes);
app.use('/', router); // importa todas as outras rotas

// Rota teste para ver se o servidor está funcionando
app.get('/', (req,res) => res.send('Bem-vindo à API de Adoção!'));

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));