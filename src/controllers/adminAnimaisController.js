import Animal from '../models/Animal.js';
import {sequelize} from '../database/database.js';



export async function listarAnimais(req, res) {
  try {
    const filtros = {};
    if (req.query.especie) filtros.especie = req.query.especie;
    if (req.query.porte) filtros.porte = req.query.porte;

    const animais = await Animal.findAll({ where: filtros });
    res.status(200).json(animais);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar animais' });
  }
}

export async function atualizarAnimal(req, res) {
  try {
    const { id } = req.params;
    const dados = req.body;

    if (Object.keys(dados).length === 0) {
      return res.status(400).json({ erro: 'Nenhum campo foi fornecido para atualização'})
    }

    const animal = await Animal.findByPk(id);

    if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });

    await animal.update(dados);
    res.status(200).json(animal);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar animal' });
  }
}

export async function deletarAnimal(req, res) {
  try {
    const { id } = req.params;
    const animal = await Animal.findByPk(id);

    if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });

    await animal.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover animal' });
  }
}

export async function getAnimalPorID(req, res) {
  try {
    const { id } = req.params;

    if (!id) return res.status(404).json({ erro: 'ID Inválido'})

    const animal = await Animal.findByPk(id);

      res.status(200).json(animal)

  } catch (error) {
    res.status(404).json({erro: "Animal não encontrado"});
  }
  
}

