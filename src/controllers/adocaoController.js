import { connectDatabase } from '../database/database.js';
import  createAnimalModel from '../models/Animal.js';
import  createTutorModel from '../models/Usuario.js'
import  createPedidoAdocaoModel from '../models/PedidoAdocao.js'
import  createQuestionarioModel from '../models/Questionario.js'


const Animal = createAnimalModel(connectDatabase);
const Tutor = createTutorModel(connectDatabase);
const PedidoAdocao = createPedidoAdocaoModel(connectDatabase);
const Questionario = createQuestionarioModel(connectDatabase);

export async function PostAdocao(req,res) {
    const {tutorId, animalId } = req.body;

    try{
        const tutor = await Tutor.findByPk(tutorId);
        const animal = await Animal.findByPk(animalId);

        if(!tutor || !animal){
            return res.status(404).json({error: "Tutor não encontrado"});
        }

        const questionario = await Questionario.findOne({ where: {tutorId: tutor.id}});

        if (!questionario) {
            return res.status(400).json({ error: "O tutor não possui um questionário preenchido" });
            
        }

        const pedidoExistente = await PedidoAdocao.findOne({where: {tutorId, animalId}});

        if(pedidoExistente){
            return res.status(409).json({error: "Este tutor já tem um pedido de adoção para este animal"});
        }

        const pedidoExistenteAnimal = await PedidoAdocao.count({where: {animalId}});

        const posicaoFila = pedidoExistenteAnimal + 1;

        const novoPedido = await PedidoAdocao.create({
            tutorId,
            animalId,
            posicao_fila: posicaoFila,
        });

        return res.status(201).json({
            id: novoPedido.id,
            tutorId: novoPedido.tutorId,
            animalId: novoPedido.animalId,
            status: novoPedido.status,
            posicao_fila: novoPedido.posicao_fila,
            criado_em: novoPedido.createdAt,

        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Erro ao registrar o pedido de adoção"});
    }
}

