//importando a biblioteca sequelize (orm)
import { Sequelize } from 'sequelize';

//criando uma instância de conexão com o banco
export const sequelize = new Sequelize({
  dialect: 'sqlite', //define que o banco é sqlite 
  storage: './database/db.sqlite' //caminho do arquivo que vai guardar os dados
});

//função assíncrona, por conta que a conexão com o banco pode ser demorada e pode falhar
export const connectDatabase = async () => {
  try {
    await sequelize.authenticate(); //verifica se a conexão com o banco está funcionando
    console.log('Conexão com o banco feita com sucesso!');
    await sequelize.sync(); // cria tabelas baseadas nos models
  } catch (error) { //se a conexão falhar, cai aqui e mostra o erro
    console.error('Erro ao conectar com o banco:', error);
  }
};

//export default { sequelize, connectDatabase } ; exportando a instância de dados