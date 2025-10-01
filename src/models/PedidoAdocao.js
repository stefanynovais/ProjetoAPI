import { DataTypes } from 'sequelize';
import  {sequelize}  from '../database/database.js';

    const PedidoAdocao = sequelize.define('PedidoAdocao', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'em_analise',
            allowNull: false
        },
        posicao_fila: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tutorId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        animalId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        tableName: 'pedidos_adocao',
        timestamps: true
    });

    export default PedidoAdocao;
