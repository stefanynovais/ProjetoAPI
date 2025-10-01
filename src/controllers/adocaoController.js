import PedidoAdocao from '../models/PedidoAdocao.js';
import Usuario from '../models/Usuario.js';
import Questionario from '../models/Questionario.js';
import Animal from '../models/Animal.js';

export async function PostAdocao(req, res) {
  const { usuario_id, animal_id } = req.body;

  if (!usuario_id || !animal_id) {
    return res.status(400).json({ erro: 'Os campos usuario_id e animal_id são obrigatórios' });
  }

  try {
    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const animal = await Animal.findByPk(animal_id);
    if (!animal) {
      return res.status(404).json({ erro: 'Animal não encontrado' });
    }

    const questionario = await Questionario.findOne({ where: { usuarioId: usuario_id } });
    if (!questionario) {
      return res.status(400).json({ erro: 'O usuário ainda não respondeu o questionário obrigatório' });
    }

    const pedidoExistente = await PedidoAdocao.findOne({
      where: { usuarioId: usuario_id, animalId: animal_id, status: 'em_analise' }
    });
    if (pedidoExistente) {
      return res.status(409).json({ erro: 'Já existe um pedido de adoção em análise para este animal por este usuário' });
    }

    const fila = await PedidoAdocao.count({ where: { animalId: animal_id } });

    const novoPedido = await PedidoAdocao.create({
      usuarioId: usuario_id,
      animalId: animal_id,
      status: 'em_analise',
      posicao_fila: fila + 1
    });

    return res.status(201).json(novoPedido);
  } catch (error) {
    console.error('Erro ao registrar o pedido de adoção:', error);
    return res.status(500).json({ erro: 'Erro ao registrar o pedido de adoção', detalhes: error.message });
  }
}
