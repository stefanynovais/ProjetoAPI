import { sequelize } from '../database/database.js';
import Usuario from '../models/Usuario.js';

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco principal!');

    await Usuario.sync();
    
    const adminDados = {
      nome_completo: 'Administrador',
      email: 'admin@sistema.com',
      senha: 'admin123',
      administrador: true,
      cidade: 'Campinas',
      estado: 'São Paulo',
      idade: 30,
      telefone: '0000000000',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const adminExistente = await Usuario.findOne({ where: { email: adminDados.email } });

    if (adminExistente) {
      // Atualiza dados do admin
      await adminExistente.update(adminDados);
      console.log('Admin existente atualizado com sucesso!');
    } else {
      // Cria o admin
      await Usuario.create(adminDados);
      console.log('Admin criado com sucesso!');
    }

    process.exit();
  } catch (err) {
    console.error('Erro ao criar ou atualizar admin:', err);
    process.exit(1);
  }
};

seedAdmin();


