import Usuario from '../models/Usuario.js';

// GET /usuarios/me
export async function getUsuarioLogado(req, res) {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ erro: 'Não autenticado' });

    const usuario = await Usuario.findByPk(userId, {
      attributes: { exclude: ['senha', 'foto', 'createdAt', 'updatedAt'] }
    });

    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const userJson = usuario.toJSON();
    userJson.fotoUrl = `/usuarios/${userId}/foto`;

    return res.status(200).json(userJson);
  } catch (error) {
    console.error('getUsuarioLogado error', error);
    return res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
}

// GET /usuarios/:id/foto
export async function exibirFotoUsuario(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).send('Usuário não encontrado');

    // se não houver foto no banco, servir imagem padrão do servidor (assets/avatar-placeholder.png)
    if (!usuario.foto) {
      // ajuste o caminho para onde sua imagem padrão está servida publicamente
      return res.sendFile('assets/avatar-placeholder.png', { root: process.cwd() }, (err) => {
        if (err) {
          console.error('Erro ao enviar fallback:', err);
          res.status(500).send('Erro ao carregar imagem');
        }
      });
    }

    const buffer = usuario.foto;
    let contentType = 'image/jpeg';
    if (buffer && buffer.length >= 4) {
      if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) contentType = 'image/png';
      else if (buffer[0] === 0xFF && buffer[1] === 0xD8) contentType = 'image/jpeg';
    }

    res.set('Content-Type', contentType);
    return res.send(buffer);
  } catch (error) {
    console.error('exibirFotoUsuario error', error);
    return res.status(500).send('Erro ao carregar imagem');
  }
}

// PUT /usuarios/:id/foto
export async function atualizarFotoUsuario(req, res) {
  try {
    const userId = Number(req.params.id);
    if (!req.userId || req.userId !== userId) return res.status(403).json({ erro: 'Operação não permitida' });

    const file = req.file;
    if (!file) return res.status(400).json({ erro: 'Arquivo de imagem é obrigatório' });

    const fotoBuffer = file.buffer;
    await Usuario.update({ foto: fotoBuffer }, { where: { id: userId } });

    return res.status(200).json({ mensagem: 'Foto atualizada com sucesso' });
  } catch (error) {
    console.error('atualizarFotoUsuario error', error);
    return res.status(500).json({ erro: 'Erro ao atualizar foto' });
  }
}

