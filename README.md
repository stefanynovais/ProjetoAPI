# **🐾 : Sistema de Adoção - API REST com Node.js : 🐾**
## 📌 Integrantes: 
:cherry_blossom: Ana Júlia

:cherry_blossom: Júlia

:cherry_blossom: Luana

:cherry_blossom: Maria Júlia

:cherry_blossom: Stefany 
 
### 🐈‍⬛ Turma: :octocat: 2DS MTEC

## 📌 Dependências:
:tulip: npm i

:tulip: jsonwebtoken

:tulip: sqlite3

:tulip: express

:tulip: qrcode

:tulip: cors


## 📌 Tecnologias:

[![My Skills](https://skillicons.dev/icons?i=js,sqlite,nodejs,express)](https://skillicons.dev)


import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
export const sequelize = new Sequelize({
  username: 'postgres',
  password: 'suaSenha!',
  database: 'postgres',
  host: 'db.zkkfohoezlmgviosrked.supabase.co',
  port: 5432,
  dialect: 'postgres',
  logging: false
});

postgresql://postgres:[YOUR-PASSWORD]@db.zkkfohoezlmgviosrked.supabase.co:5432/postgres

// Instalar o pacote pg com npm i pg
// Criar uma conta no supabase para o grupo
// Alterar o index.js para o postgres se não estiver utilizando o .env
// Alterar o Modelos.js para o postgres se não estiver utilizando o .env

Adicionar na tabela de questionários a coluna tutorId
