import AnimalModel from '../models/Animal.js';
import {sequelize} from '../database/database.js'

const Animal = AnimalModel(sequelize);

export async function PostAnimais(req,res) {

    try {
        const [nome, especie, porte, castrado, vacinado, descricao, foto] = req.body; // ainda vou add a questão do buffer

        if( !nome || !especie || !porte || !castrado || !vacinado || !descricao || !foto) {
            res.status(400).json({"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."});
        }

        const novoAnimal = await Animal.create({
            nome,
            especie, 
            porte, 
            castrado, 
            vacinado, 
            descricao, 
            foto
        });

        res.status(201).json("Animal cadastro com sucesso!", novoAnimal);
        
    } catch (error) {
        res.status(500).json({"erro": "Erro interno ao cadastrar o animal."});
    }

}

export async function GetAnimais(req,res) {
    try {
        const animal = await Animal.findAll(); // ainda vou fazer o filtro

        res.status(200).json(animal);
        
    } catch (error) {
        res.status(500).json({"erro": "Erro ao buscar animais"});
        
    }
}

export async function GetAnimaisByID(req,res){
    try {
        const {id} = req.params

         if(!id){
            res.status(404).json("Id inválido!");
         }

         const animal = await Animal.findByPk(id);

         res.status(200).json(animal)

    } catch (error) {
        res.status(404).json({"erro": "Animal não encontrado"});
    }

}