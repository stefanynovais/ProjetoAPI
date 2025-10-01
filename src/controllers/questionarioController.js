import Questionario from '../models/Questionario.js';
import Usuario from '../models/Usuario.js';

//controller do POST /questionario
export const criarQuestionario = async (req, res) => {
    try {

        //receber os dados do questionário e o ID do tutor
        const { id, ...dados } = req.body; //objeto que tem todos os dados enviados pelo frontend
        //quando fazemos post numa api, enviamos dados do frontend para o backend
        //no express.js, esses dados ficam disponíveis no express.js
        //usuarioId separadamente porque ele serve para buscar o tutor no banco 
        //o restante (dados) vai direto para criar o questionário no banco
        //dessa forma, a gente não precisa escrever cada campo manualmente, tudo que veio no req.body (exceto o usuarioId) vai direto para o banco

        //verifica se o usuário (tutor) existe no banco
        const usuario = await Usuario.findByPk(id); //busca pelo ID do usuário
        if (!usuario) {
            //se ele não existir, retorna o 404 Not Found
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        //valida campos obrigatórios
        //aqui a gente vai listar todos os campos que não podem ficar vazios, os campos obrigatórios
        const camposObrigatorios = [
            'quantos_animais_possui', 'motivos_para_adotar', 'quem_vai_sustentar_o_animal',
            'numero_adultos_na_casa', 'numero_criancas_na_casa', 'residencia_tipo',
            'proprietario_permite_animais', 'todos_de_acordo_com_adocao', 'responsavel_pelo_animal',
            'responsavel_concorda_com_adocao', 'ha_alergico_ou_pessoas_que_nao_gostam',
            'gasto_mensal_estimado', 'valor_disponivel_no_orcamento', 'tipo_alimentacao',
            'local_que_o_animal_vai_ficar', 'forma_de_permanencia', 'forma_de_confinamento',
            'tera_brinquedos', 'tera_abrigo', 'tera_passeios_acompanhado', 'tera_passeios_sozinho',
            'companhia_outro_animal', 'companhia_humana_24h', 'companhia_humana_parcial',
            'sem_companhia_humana', 'sem_companhia_animal', 'o_que_faz_em_viagem',
            'o_que_faz_se_fugir', 'o_que_faz_se_nao_puder_criar', 'animais_que_ja_criou',
            'destino_animais_anteriores', 'costuma_esterilizar', 'costuma_vacinar',
            'costuma_vermifugar', 'veterinario_usual', 'forma_de_educar',
            'envia_fotos_e_videos_do_local', 'aceita_visitas_e_fotos_do_animal',
            'topa_entrar_grupo_adotantes', 'concorda_com_taxa_adocao', 'data_disponivel_para_buscar_animal'
        ];

        //checando se algum campo obrigatório está ausente ou nulo
        for (const campo of camposObrigatorios) {
            if (dados[campo] === undefined || dados[campo] === null) {
                return res.status(400).json({
                    erro: "Todos os campos obrigatórios devem ser preenchidos corretamente."
                });
            }
        }

        //criando o questionário no banco de dados, associando ao usuário
        const questionario = await Questionario.create({
            ...dados,     //todos os dados do questionário
            usuarioId      //associando o questionário ao tutor correto
        });

        //retornando o questionário criado
        return res.status(201).json(questionario);

    } catch (error) {
        //tratando os erros que podem dar no código
        console.error("Erro ao criar questionário:", error);
        return res.status(500).json({ erro: "Erro interno ao criar questionário" });
    }
};