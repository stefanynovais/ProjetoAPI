import Animal from '../models/Animal.js';

export async function PostAnimais(req, res) {
    try {
        const { nome, especie, porte, castrado, vacinado, descricao, foto } = req.body;

        if (!nome || !especie || !porte || castrado === undefined || vacinado === undefined || !descricao || !foto) {
            return res.status(400).json({ "erro": "Todos os campos obrigatórios devem ser preenchidos corretamente." });
        }

        // Converte a string base64 para buffer
        const fotoBuffer = Buffer.from(foto, 'base64');

        const novoAnimal = await Animal.create({
            nome,
            especie,
            porte,
            castrado,
            vacinado,
            descricao,
            foto: fotoBuffer,
        });

        return res.status(201).json({ mensagem: "Animal cadastrado com sucesso!", animal: novoAnimal });

    } catch (error) {
        console.error("Erro ao cadastrar animal:", error);
        return res.status(500).json({ "erro": "Erro interno ao cadastrar o animal." });
    }
}

export async function GetAnimais(req,res) {
    try {
        const { nome, especie, porte, castrado, vacinado, adotado} = req.query; // vê os campos de consulta que podem terna req

        const filtro = {}; 

        if (nome) filtro.nome = nome;
        if (especie) filtro.especie = especie;
        if (porte) filtro.porte = porte;
        if (castrado !== undefined) filtro.castrado = castrado === 'true'; // transforma os booleans em true
        if (vacinado !== undefined) filtro.vacinado = vacinado === 'true';
        if (adotado !== undefined) filtro.adotado = adotado === 'true';

        const animal = await Animal.findAll({ filtro, order: [['createdAt', 'ASC']]}); // oredena de mais antigo par mais novo

        return res.status(200).json(animal);
        
    } catch (error) {
        return res.status(500).json({"erro": "Erro ao buscar animais"});
        
    }
}

