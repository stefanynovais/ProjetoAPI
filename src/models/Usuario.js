import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export default (sequelize) => {
    const Usuario = sequelize.define('usuario', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        nome_completo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: { msg: 'Email inválido' }
            }
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        celular: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bairro: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cep: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        instagram: {
            type: DataTypes.STRING,
            allowNull: true
        },
        facebook: {
            type: DataTypes.STRING,
            allowNull: true
        },
        administrador: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        tableName: 'Usuario', //força o nome da tabela para "Usuario" no banco de dados
        timestamps: true //cria automaticamente os campos createdAt e updatedAt para registrar quando o registro foi criado ou atualizado.
    });


    //hook é uma função que o Sequelize executa automaticamente antes ou depois de uma ação no banco de dados
    //hook antes de criar um usuário, a senha é automaticamente transformada em hash
    Usuario.beforeCreate(async (usuario) => {
        if (usuario.senha) {
            usuario.senha = await bcrypt.hash(usuario.senha, 10); //hash seguro da senha com 10 salt rounds
        }
    });

    //hook que para se a senha for alterada, ela também é hasheada automaticamente
    Usuario.beforeUpdate(async (usuario) => {
        if (usuario.changed('senha')) {
            usuario.senha = await bcrypt.hash(usuario.senha, 10); //hash seguro da senha com 10 salt rounds
        }
    });

    return Usuario;
};
