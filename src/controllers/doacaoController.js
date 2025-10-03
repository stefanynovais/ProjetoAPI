import Doacao from "../models/Modelos.js";
import QRCode from 'qrcode';


export async function PostDoacao(req, res) {
    const { nome, email, valor, mensagem } = req.body;

  if (!valor || valor <= 0) {
    return res.status(400).json({ erro: 'Valor da doação deve ser positivo' });
  }

  try {
    const linkPix = `pix://chave=chavepix@exemplo.com&valor=${valor}&nome=${encodeURIComponent(nome)}`;

    const qrCodeDataURL = await QRCode.toDataURL(linkPix);

    const novaDoacao = await Doacao.create({
      nome,
      email,
      valor,
      mensagem,
      linkPix
    });

    return res.status(201).json({
      doacao_id: novaDoacao.id,
      nome,
      valor,
      mensagem,
      linkPix,
      qrCode: qrCodeDataURL
    });
  } catch (error) {
    console.error(error); // Adicione esta linha para ver o erro no terminal
    return res.status(500).json({ erro: 'Erro ao gerar QR Code da doação' });
  }
}