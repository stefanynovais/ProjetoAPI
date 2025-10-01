import { connectDatabase } from '../database/database.js';
import createAnimalModel from '../models/Animal.js';
import createPedidoAdocaoModel from '../models/PedidoAdocao.js';
import createQuestionarioModel from '../models/Questionario.js';
import createUsuarioModel from '../models/Usuario.js';

const Animal = createAnimalModel(connectDatabase);
const Usuario = createUsuarioModel(connectDatabase);
const PedidoAdocao = createPedidoAdocaoModel(connectDatabase);
const Questionario = createQuestionarioModel(connectDatabase);

export async function PostAdocao(req, res) {
    const { tutorId, animalId } = req.body;

    //validação inicial
    if (!tutorId || !animalId) {
        return res.status(400).json({ erro: 'Os campos usuarioId e animalId são obrigatórios' });
    }

    try {
        //verifica se o usuario existe
        const usuario = await Usuario.findByPk(Id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        //verifica se o animal existe
        const animal = await Animal.findByPk(Id);
        if (!animal) {
            return res.status(404).json({ erro: 'Animal não encontrado' });
        }

        //verifica se o usuario respondeu o questionario
        const questionario = await Questionario.findOne({ where: { tutorId } });
        if (!questionario) {
            return res.status(400).json({ erro: 'O usuário ainda não respondeu o questionário obrigatório' });
        }

        //verifica se ja existe um pedido de adoção em analise
        const pedidoExistente = await PedidoAdocao.findOne({
            where: { tutorId, animalId, status: 'em_analise' }
        });
        if (pedidoExistente) {
            return res.status(409).json({ erro: 'Já existe um pedido de adoção em análise para este animal por este usuário' });
        }

        //calcula a posição na fila
        const fila = await PedidoAdocao.count({ where: { animalId } });

        //cria o novo pedido de adoção
        const novoPedido = await PedidoAdocao.create({
            tutorId,
            animalId,
            status: 'em_analise',
            posicao_fila: fila + 1,
            criado_em: 'Y'
        });

        return res.status(201).json(novoPedido);
    } catch (error) {
        console.error('Erro ao registrar o pedido de adoção:', error);
        return res.status(500).json({ erro: 'Erro ao registrar o pedido de adoção', detalhes: error.message });
    }
}
