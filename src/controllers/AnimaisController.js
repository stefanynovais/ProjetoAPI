import Animal from '../models/Animal.js';

export async function PostAnimais(req, res) {
    try {
        // Aqui desestruturamos o objeto
        const { nome, especie, porte, castrado, vacinado, descricao, fotoBase64 } = req.body;

        if (!nome || !especie || !porte || castrado === undefined || vacinado === undefined || !descricao || !fotoBase64) {
            return res.status(400).json({ "erro": "Todos os campos obrigatórios devem ser preenchidos corretamente." });
        }

        // Converte a string base64 para buffer
        const fotoBuffer = Buffer.from(fotoBase64, 'base64');

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
        const animal = await Animal.findAll(); // ainda vou fazer o filtro 
                                               // data[], ordenar por padrão do mais antigo para o mais recente

       return res.status(200).json(animal);
        
    } catch (error) {
        return res.status(500).json({"erro": "Erro ao buscar animais"});
        
    }
}

