import  {sequelize}  from '../database/database.js';
import Animal from './Animal.js';
import Usuario from './Usuario.js';
import Questionario from './Questionario.js';
import PedidoAdocao from './PedidoAdocao.js';
import Doacao from './Doacao.js';


//usuario e questionario
Usuario.hasOne(Questionario, {
    foreignKey: 'tutorId',
    as: 'questionario',
});
Questionario.belongsTo(Usuario, {
    foreignKey: 'tutorId',
    as: 'usuario',
});

//usuario e pedido de adocao
Usuario.hasMany(PedidoAdocao, {
    foreignKey: 'usuarioId',
    as: 'pedidosAdocao',
});
PedidoAdocao.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario',
});

//animal e pedido de adocao
Animal.hasMany(PedidoAdocao, {
    foreignKey: 'animalId',
    as: 'pedidosAdocao',
});
PedidoAdocao.belongsTo(Animal, {
    foreignKey: 'animalId',
    as: 'animal',
});

await sequelize.sync({ alter: true });

export default { Animal, Usuario, Questionario, PedidoAdocao, Doacao };
