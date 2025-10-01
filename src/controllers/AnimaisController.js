import Animal from '../models/Animal.js';

export async function PostAnimais(req,res) {

    try {
        const [nome, especie, porte, castrado, vacinado, descricao, fotoBase64] = req.body; // ainda vou add a questão do buffer
        // const fotoBuffer = req.file?.buffer; // pega o buffer da imagem

        if( !nome || !especie || !porte || castrado === undefined|| vacinado === undefined || !descricao || !fotoBase64) {
            res.status(400).json({"erro": "Todos os campos obrigatórios devem ser preenchidos corretamente."});
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
            foto: fotoBuffer, // salva o buffer no campo 'foto'
        });

        res.status(201).json("Animal cadastro com sucesso!", novoAnimal);
        
    } catch (error) {
        res.status(500).json({"erro": "Erro interno ao cadastrar o animal."});
    }

}

export async function GetAnimais(req,res) {
    try {
        const animal = await Animal.findAll(); // ainda vou fazer o filtro 
                                               // data[], ordenar por padrão do mais antigo para o mais recente

        res.status(200).json(animal);
        
    } catch (error) {
        res.status(500).json({"erro": "Erro ao buscar animais"});
        
    }
}

