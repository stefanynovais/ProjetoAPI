import  {sequelize}  from '../database/database.js';
import Animal from './Animal.js';
import Usuario from './Usuario.js';
import Questionario from './Questionario.js';
import PedidoAdocao from './PedidoAdocao.js';
import Doacao from './Doacao.js';


//relacionamentos entre os modelos

//usuario e questionario
Usuario.hasOne(Questionario, {
    foreignKey: 'tutorId',
    as: 'questionarios',
});
Questionario.belongsTo(Usuario, {
    foreignKey: 'tutorId',
    as: 'Usuario',
});

//usuario e pedido de adocao
Usuario.hasMany(PedidoAdocao, {
    foreignKey: 'usuarioId',
    as: 'pedidos_adocao',
});
PedidoAdocao.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    as: 'Usuario',
});

//animal e pedido de adocao
Animal.hasMany(PedidoAdocao, {
    foreignKey: 'animaisId',
    as: 'pedidos_adocao',
});
PedidoAdocao.belongsTo(Animal, {
    foreignKey: 'animaisId',
    as: 'animais',
});

// ======== FUNÇÃO PARA INICIALIZAR TABELAS ========
export const initModels = async () => {
  try {
    await sequelize.sync({ force: true }); // força criar todas as tabelas
    console.log('Tabelas criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
  }
};

export default { Animal, Usuario, Questionario, PedidoAdocao, Doacao };
