import { connectDatabase } from '../database/database.js';
import UsuarioModel from '../models/Usuario.js';
import bcrypt from 'bcrypt'; //biblioteca que criptrografa a senha

const seed = async () => {
  try {
    //conectando ao banco e pegando a instância do Sequelize
    const sequelize = await connectDatabase();

    //importando o model passando o Sequelize
    const Usuario = UsuarioModel(sequelize);

    //sincroniza a tabela (force: true apaga dados antigos)
    await Usuario.sync({ force: true });

    //criando usuário de teste com senha hash (frheiu248hf93)
    //essa função transforma a senha original em uma sequência de caracteres única, que não pode ser facilmente revertida para descobrir a senha original.
    //usamos essa senha "hash" por segurança, se o banco for invadido, o hacker não vai conseguir ver a senha real
    const senhaHash = await bcrypt.hash('123456', 10); //"senhaHash" senha hash resultante; senha original, 10 salt rounds (quantas vezes o algoritmo vai embaralhar a senha)
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