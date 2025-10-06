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

## 📌 Arquitetura e Estrutura do Projeto
 
O projeto segue uma estrutura organizada, incluindo pastas para diferentes componentes:
 
*   `controllers`: Contém a lógica de negócios para processar requisições. Ele executa o pedido do usuário, busca informações no banco e prepara a resposta para o cliente.
    *   Exemplos de Controllers: `AnimaisController.js`, `AdocaoController.js`, `authController.js`, `TutorController.js`.
*   `models`: Define as entidades do banco de dados.
*   `routes`: Define os caminhos (endpoints) para acesso aos recursos do sistema.
*   `database`: Contém arquivos relacionados à conexão com o banco de dados.
*   `middlewares`: Contém a lógica para interceptar requisições para a autenticação de administrador (`authAdmin.js`).

## 📌 Modelos de Dados (Entidades)
 
A API gerencia dados de adoção, utilizando os seguintes modelos, todos configurados para incluir colunas `createdAt` e `updatedAt`:
 
| Modelo | Descrição | Associações/Detalhes |
| :--- | :--- | :--- |
| **Tutor (ou Usuário)** | Representa o usuário do sistema. Contém dados pessoais, como `nome_completo`, `email` (único), `senha` (criptografada), `cidade`, `estado`, `idade`, `telefone`, `cpf` (único opcional), e a flag `administrador` (booleano, padrão `false`). | Um Tutor tem um Questionário. Um Tutor pode ter vários Pedidos de Adoção. |
| **Questionario** | Contém respostas detalhadas sobre a aptidão do tutor para adotar. Inclui perguntas sobre residência, número de pessoas na casa, gastos, manejo de animais anteriores, e concordância com esterilização e visitas pós-adoção. | Associado a um Tutor. |
| **Animal** | Contém informações sobre o animal disponível para adoção (nome, espécie, porte, status, etc.). | Um Animal pode ter vários Pedidos de Adoção. |
| **PedidoAdocao** | Tabela de junção entre `Tutor` e `Animal`, representa o pedido em si. | Contém campos `tutorId`, `animalId`, `status` (padrão 'em\_analise') e `posicao_fila`. |
| **Doacao** | Usado para registrar doações recebidas. | |

## 📌 Autenticação e Autorização
 
### Login
 
O login é realizado através da rota de autenticação, validando email e senha:
 
*   O sistema deve utilizar criptografia para salvar as senhas, sendo mencionada a biblioteca `encryptjs`.
*   O endpoint de login busca o usuário pelo email, descriptografa a senha armazenada (usando `encryptjs` e uma chave secreta) e, se as credenciais estiverem corretas, gera um **JSON Web Token (JWT)**.
*   Alternativamente, há implementações que utilizam `bcrypt` para comparação de senhas.
 
### Acesso Administrativo
 
As rotas administrativas são protegidas por autorização.
 
*   O middleware `authAdmin` é responsável por verificar se o usuário que fez a requisição possui a permissão de administrador.
*   Ele verifica o token JWT fornecido no cabeçalho `Authorization`.
*   Se o token for válido, o sistema busca o usuário e verifica se o campo `administrador` é `true`. Caso contrário, retorna erro `403 Forbidden`.

## 📌 Endpoints:

A API suporta operações CRUD (Create, Read, Update, Delete) em suas entidades principais, além de rotas de autenticação e doação.
 
### Rotas de Usuários e Questionário (Tutores)
 
| Método | Rota | Descrição | Status de Sucesso | Status de Erro Comuns |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/usuario` (ou `/tutores`) | Cadastra um novo tutor. O questionário pode ser enviado junto. | 201 Created | 400 Bad Request (dados ausentes, email já existe), 500 Internal Server Error |
| **POST** | `/questionario` | Cadastra ou preenche o questionário. Exige que o usuário já exista. | 201 Created | 400 Bad Request (dados ausentes/incompletos) |
| **PATCH** | `/tutores/:id` | Permite ao tutor atualizar seus dados e/ou completar o questionário. | 200 OK | 400 Bad Request (nenhum campo enviado), 404 Not Found (Tutor) |
| **GET** | `/tutores/:id` | Retorna os dados e o questionário preenchido de um tutor. | 200 OK | 404 Not Found (Tutor) |
| **POST** | `/autenticacao` ou `/login` | Realiza a validação de email e senha (Login). | 200 OK | 401 Unauthorized (credenciais inválidas), 500 Internal Server Error |
 
### Rotas de Animais e Adoção
 
| Método | Rota | Descrição | Status de Sucesso | Status de Erro Comuns |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/animais` | Cadastra um novo animal. Deve salvar o **buffer** da imagem no campo `foto`. | 201 Created | 400 Bad Request, 500 Internal Server Error |
| **GET** | `/animais` | Lista os animais disponíveis. Suporta filtros (espécie, porte, castrado etc.). Ordena por padrão do mais antigo para o mais recente. | 200 OK ou 201 Created | 500 Internal Server Error |
| **POST** | `/adocoes` | Cria um novo pedido de adoção. Exige formulário preenchido do tutor. Pedidos organizados por ordem de chegada. | 201 Created | 400 Bad Request (tutor não pode fazer pedido), 404 Not Found (tutor/animal), 409 Conflict (pedido ativo já existe) |
 
### Rotas Administrativas (Protegidas por Autorização)
 
Esses endpoints exigem que o usuário seja um administrador.
 
| Método | Rota | Descrição | Status de Sucesso | Status de Erro Comuns |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/admin/animais` | Visualiza todos os animais, com filtros avançados e seus pedidos de adoção. | 200 OK | 500 Internal Server Error |
| **PATCH** | `/admin/animais/:id` | Atualiza status do animal (castrado, vacinado, adotado, etc.). | 200 OK | 400 Bad Request (nenhum campo fornecido), 404 Not Found (Animal), 500 Internal Server Error |
| **DELETE** | `/admin/animais/:id` | Remove um animal da base de dados. | 204 No Content | 404 Not Found, 403 Forbidden (sem permissão), 500 Internal Server Error |
| **GET** | `/animais/:id` | Busca um animal por ID, retorna todas as informações, incluindo a lista de pedidos ordenada (mais antigo para mais recente). | 200 OK | 404 Not Found |
 
### Rotas de Doações
 
| Método | Rota | Descrição | Status de Sucesso | Status de Erro Comuns |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/doacoes` | Registra uma doação recebida (nome, valor e data). | 201 Created | 400 Bad Request (valor ausente/inválido), 500 Internal Server Error |

## 📌 Códigos de Status HTTP 
 
A API utiliza códigos de status HTTP para indicar o resultado da requisição:
 
*   **200 OK**: Requisição bem-sucedida.
*   **201 Created**: Recurso criado com sucesso (usado em respostas POST).
*   **204 No Content**: Requisição bem-sucedida, sem conteúdo a retornar (ex: após um DELETE).
*   **400 Bad Request**: Requisição inválida ou malformada.
*   **401 Unauthorized**: Cliente não autenticado.
*   **403 Forbidden**: Cliente não tem permissão para acessar o recurso (usado nas rotas de `admin`).
*   **404 Not Found**: Recurso solicitado não foi encontrado.
*   **409 Conflict**: Já existe um recurso ativo que impede a criação (ex: pedido de adoção ativo).
*   **500 Internal Server Error**: Erro interno inesperado no servidor.


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
