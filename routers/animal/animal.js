import bodyParser from 'body-parser';
import express from 'express';
import Animal from '../../models/Animal';

const Animais = async (app) => {
    await Animal.sync({force:true});
    const port = 300;
    const app = express();
    app.use(bodyParser.json);

    // Rotas

    app.post("/animais", async function (req,res) {
        const animal = await Animal.create({
            id:req.body.id, 
            nome: req.body.nome, 
            especie: req.body.especie,
            porte: req.body.porte, 
            castrado: req.body.castrado,
            vacinado: req.body.vacinado,
            adotado: req.body.adotado,
            descricao: req.body.descricao,
            foto: req.body.foto
        
        });
            res.json(animal);
    });

    app.get("/animais", async function (req,res){
        const animal = await Animal.findAll();
        res.json(animal);
    });
    
}

export default Animais;