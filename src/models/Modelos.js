import  {sequelize}  from '../database/database.js';
import AnimalModel from './Animal.js';
import UsuarioModel from './Usuario.js';
import QuestionarioModel from './Questionario.js';
import PedidoAdocaoModel from './PedidoAdocao.js';
import DoacaoModel from './Doacao.js';


export const Animal = AnimalModel(sequelize);
export const Usuario = UsuarioModel(sequelize);
export const Questionario = QuestionarioModel(sequelize);
export const PedidoAdocao = PedidoAdocaoModel(sequelize);
export const Doacao = DoacaoModel(sequelize);

//relacionamentos entre os modelos

//usuario e questionario
Usuario.hasOne(Questionario, {
    foreignKey: 'usuarioId',
    as: 'questionario',
});
Questionario.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
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

export default { sequelize, Animal, Usuario, Questionario, PedidoAdocao, Doacao };
