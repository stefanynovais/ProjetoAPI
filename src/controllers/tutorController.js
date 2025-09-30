import Usuario from "../models/Usuario.js";
import Questionario from "../models/Questionario.js";

const camposObrigatorios = [
    'nome_completo', 'email', 'senha', 'cidade',
    'estado', 'idade', 'cpf', 'endereco', 'bairro', 'cep'
];

export const criarTutor = async (req, res) => {
    try {
        const camposFaltantes = camposObrigatorios.filter(campo => !req.body[campo]);

        if (camposFaltantes.length > 0) {
            return res.status(400).json({
                error: "Todos os campos obrigatórios devem ser preenchidos corretamente.",
                camposFaltantes
            });
        }

        const emailExistente = await Usuario.findOne({ where: { email: req.body.email } });

        if (emailExistente) {
            return res.status(400).json({ error: "Email preenchido já está sendo utilizado." });
        }

        const tutor = await Usuario.create({ ...req.body });

        return res.status(201).json(tutor);

    } catch (error) {
        return res.status(500).json({ error: "Erro interno ao cadastrar o tutor" });
    }
};

export const buscarTutor = async (req, res) => {
    try {
        const tutor = await Usuario.findByPk(req.params.id, {
            include: [{
                model: Questionario,
                as: 'questionario'
            }]
        });

        if (!tutor) {
            return res.status(404).json({ error: "Tutor não encontrado" });
        }

        return res.status(200).json(tutor);

    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar dados do tutor" });
    }
};

export const atualizarTutor = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Pelo menos um campo deve ser enviado para atualização" });
        }

        const tutor = await Usuario.findByPk(req.params.id, {
            include: [{
                model: Questionario,
                as: 'questionario'
            }]
        });

        if (!tutor) {
            return res.status(404).json({ error: "Tutor não encontrado" });
        }

        const { questionario, ...dadosTutor } = req.body;

        await tutor.update(dadosTutor);

        if (questionario) {
            if (tutor.questionario) {
                await tutor.questionario.update(questionario);
            } else {
                await Questionario.create({
                    usuario_id: tutor.id,
                    ...questionario
                });
            }
        }

        const tutorAtualizado = await Usuario.findByPk(req.params.id, {
            include: [{
                model: Questionario,
                as: 'questionario'
            }]
        });

        return res.status(200).json(tutorAtualizado);

    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar os dados do tutor" });
    }
};
