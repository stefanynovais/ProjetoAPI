import express from 'express';
import Usuario from '../../models/Usuario';

const Tutores = async (app) => {
    await Usuario.sync({ force: true });
    app.use(express.json());
    const port = 300;

    //método post:
    app.post("/tutores", async function (req, res) {

        const tutor = await Usuario.create({
            id: req.body.id,
            nome_completo: req.body.nome_completo,
            email: req.body.email,
            senha: req.body.senha,
            cidade: req.body.cidade,
            estado: req.body.estado,
            idade: req.body.idade,
            telefone: req.body.telefone,
            celular: req.body.celular,
            cpf: req.body.cpf,
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            cep: req.body.cep,
            instagram: req.body.instagram,
            facebook: req.body.facebook,
            administrador: req.body.administrador,
        });

        res.json(tutor);
    });

    //método get:
    app.get("/tutores/:id", async function (req, res) {

        const tutor = await Usuario.findByPk(req.params.id);

        if (!tutor) {
            return res.status(404).json({ error: "Tutor não encontrado" });
        }

        res.json(tutor);
    });

    //método patch:
    app.patch("/tutores/:id", async function (req, res) {

        const tutor = await Usuario.findByPk(req.params.id);

        if (!tutor) {
            return res.status(404).json({ error: "Tutor não encontrado" });
        }


    })
}
export default Tutores;