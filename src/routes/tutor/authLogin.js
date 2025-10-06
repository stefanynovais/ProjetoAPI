//importando o Express para criar rotas
import express from 'express';

//importando a função de login do controller que vai tratar a lógica de autenticação
import { login } from '../../controllers/authLoginController.js';
import { adminLogin } from '../../controllers/authController.js';

//criando um router do Express, que serve para agrupar rotas
const routerLogin = express.Router();

//definindo a rota POST /autenticacao
//quando fizermos POST nessa rota, chamaremos a função "login" do controller
routerLogin.post('/autenticacao', login);
routerLogin.post('/autenticacaoAdmin', adminLogin);

//exportando o router para que ele seja usado no server.js
export default routerLogin;
