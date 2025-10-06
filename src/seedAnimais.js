import fs from 'fs';
import Animal from './models/Animal.js';
import { connectDatabase } from './database/database.js';

const inserirAnimais = async () => {
  await connectDatabase();

  const imagemBuffer = fs.readFileSync('./imagens/bolt.png'); // ajuste o caminho da imagem

  await Animal.create({
    nome: 'Bolt',
    especie: 'Cachorro',
    porte: 'Grande',
    castrado: true,
    vacinado: true,
    adotado: false,
    descricao: 'Cachorro ativo e protetor, adora passeios longos.',
    foto: imagemBuffer
  });

  console.log('Animal inserido com sucesso!');
};

inserirAnimais();
