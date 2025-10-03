import { connectDatabase } from '../database/database.js';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt'; //biblioteca que criptrografa a senha

const seed = async () => {
  try {
    //conectando ao banco 
    await connectDatabase();

  

    //sincroniza a tabela (force: true apaga dados antigos)
    await Usuario.sync({ force: true });

    //criando usuário de teste com senha hash (frheiu248hf93)
    //essa função transforma a senha original em uma sequência de caracteres única, que não pode ser facilmente revertida para descobrir a senha original.
    //usamos essa senha "hash" por segurança, se o banco for invadido, o hacker não vai conseguir ver a senha real
    await Usuario.create({
      nome_completo: "Teste Usuario",
      email: "teste@teste.com",
      senha: senhaHash,
      cidade: "Cidade Teste",
      estado: "Estado Teste",
      idade: 25,
      telefone: "999999999",
      administrador: false
    });

    //sucesso e tratamento de erro
    console.log("Seeder executada com sucesso!");
    process.exit();
  } catch (error) {
    console.error("Erro ao rodar seeder:", error);
    process.exit(1);
  }
};

seed();