const encrypt = require('encryptjs'); // Importa a biblioteca de criptografia
const secretKey = 'sua-chave-secreta'; // Chave usada para criptografar e descriptografar

module.exports = {
  async up(queryInterface, Sequelize) {
    // Criptografa a senha "admin123" usando a chave secreta e algoritmo de 256 bits
    const senhaCriptografada = encrypt.encrypt('admin123', secretKey, 256);

    // Insere um novo registro na tabela 'Usuarios' com os dados do administrador
    await queryInterface.bulkInsert('Usuarios', [{
      nome_completo: 'Administrador', // Nome do usuário
      email: 'admin@sistema.com',     // Email do administrador
      senha: senhaCriptografada,      // Senha criptografada
      createdAt: new Date(),          // Timestamp de criação
      updatedAt: new Date()           // Timestamp de atualização
    }], {});
  },

  async down(queryInterface, Sequelize) {
    // Remove o usuário administrador com base no email
    await queryInterface.bulkDelete('Usuarios', { email: 'admin@sistema.com' }, {});
  }
};
