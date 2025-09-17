import express from 'express';
import Usuario from '../../models/Usuario.js';

const Tutores = async (app) => {
    await Usuario.sync({ force: true });
    app.use(express.json());
    const port = 300;

    //método post:
    app.post("/tutores", async function (req, res) {

        try {

            //criação campos obrigatórios
            const camposObrigatorios = [
                'nome_completo', 'email', 'senha', 'cidade',
                'estado', 'idade', 'cpf', 'endereco', 'bairro', 'cep'
            ];

            //determina os campos faltantes
            const camposFaltantes = camposObrigatorios.filter(campo => !req.body[campo]);

            //se houver campos faltantes, retorna a mensagem de erro
            if (camposFaltantes.length > 0) {
                return res.status(400).json({
                    error: "Todos os campos obrigatórios devem ser preenchidos corretamente.",
                    camposFaltantes: camposFaltantes
                });
            }

            //procura se o e-mail que o usuário está tentando cadastrar já existe
            const emailExistente = await Usuario.findOne({
                where: { email: req.body.email }
            });

            //se sim, retorna a mensagem de erro
            if (emailExistente) {
                return res.status(400).json({
                    error: "Email preenchido já está sendo utilizado."
                });
            }

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

            res.status(201).json(tutor);

        } catch (error) {
            res.status(500).json({ error: "Erro interno ao cadastrar o tutor" });
        }
    });

    //método get:
    app.get("/tutores/:id", async function (req, res) {

        try {
            const tutor = await Usuario.findByPk(req.params.id);

            //se o tutor buscado não existir, retorna a mensagem de erro
            if (!tutor) {
                return res.status(404).json({ error: "Tutor não encontrado" });
            }

            res.status(200).json(tutor);

        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar dados do tutor" });
        }

    });

    //método patch:
    app.patch("/tutores/:id", async function (req, res) {

        try {

            //verifica se algum campo foi enviado no body
            if (Object.keys(req.body).length === 0) {

                //se não, retorna a mensagem de erro
                return res.status(400).json({
                    error: "Pelo menos um campo deve ser enviado para atualização"
                });
            }

            const tutor = await Usuario.findByPk(req.params.id);

            //se o tutor a ser atualizado não existe, retorna a mensagem de erro
            if (!tutor) {
                return res.status(404).json({ error: "Tutor não encontrado" });
            }

            //pega os campos a serem atualizados do body
            const camposAtualizados = req.body;

            //atualiza os campos selecionados
            await tutor.update(camposAtualizados);

            res.status(200).json(tutor);

        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar os dados do tutor" });
        }

    })
}
export default Tutores;