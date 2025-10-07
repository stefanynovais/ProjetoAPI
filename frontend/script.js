
const API_URL = "http://localhost:3000";

// Função para listar os animais disponíveis
async function carregarAnimais() {
    try {
        // Faz uma requisição GET para a rota /animais da API
        const res = await fetch(`${API_URL}/animais`);
        const data = await res.json(); // Converte o resultado em JSON

        // Seleciona o container onde os animais vão aparecer
        const container = document.getElementById("animais");
        container.innerHTML = ""; // Limpa o conteúdo anterior (evita duplicação)

        // Percorre cada animal retornado e cria um "card" visual
        data.forEach(animal => {
            const card = document.createElement("div"); // Cria uma <div> dinamicamente
            card.className = "animal-card"; // Adiciona a classe CSS para estilização
            card.innerHTML = `
        <h3>${animal.nome}</h3>
        <p>Espécie: ${animal.especie}</p>
        <p>Idade: ${animal.idade} anos</p>
      `;
            container.appendChild(card); // Adiciona o card no container da página
        });

    } catch (error) {
        console.error("Erro ao carregar animais:", error);
    }
}

// Evento que escuta o envio do formulário de adoção
document.getElementById("formAdocao").addEventListener("submit", async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Pega os valores digitados nos campos
    const usuario_id = document.getElementById("usuario_id").value;
    const animal_id = document.getElementById("animal_id").value;
    const msg = document.getElementById("mensagem");

    try {
        // Faz uma requisição POST para criar o pedido de adoção
        const res = await fetch(`${API_URL}/adocao`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Informa que está enviando JSON
            body: JSON.stringify({ usuario_id, animal_id }), // Converte o objeto em JSON
        });

        const data = await res.json(); // Lê a resposta da API

        // Se a requisição deu certo (status 200 ou 201)
        if (res.ok) {
            msg.style.color = "green";
            msg.textContent = "Adoção registrada com sucesso! 🎉";
            document.getElementById("formAdocao").reset(); // Limpa os campos do formulário
        } else {
            // Caso contrário, mostra o erro retornado pela API
            msg.style.color = "red";
            msg.textContent = data.erro || "Erro ao registrar adoção.";
        }

    } catch (error) {
        msg.style.color = "red";
        msg.textContent = "Falha na conexão com a API.";
    }
});

// Chama a função ao carregar a página para listar os animais automaticamente
carregarAnimais();

// passo 7: carregar dados do usuário e foto
async function carregarAsideUsuario() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const avatar = document.getElementById('user-avatar');
  const nome = document.getElementById('user-name');
  const email = document.getElementById('user-email');

  if (!token || !userId) return; // sem login, mantem placeholders

  try {
    // 1) busca dados públicos do usuário
    const resp = await fetch('http://localhost:3000/usuarios/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!resp.ok) {
      console.warn('Não foi possível obter usuário logado', resp.status);
      return;
    }
    const usuario = await resp.json();
    nome.textContent = usuario.nome || 'Usuário';
    email.textContent = usuario.email || '';

    // 2) busca a foto como blob (permite enviar Authorization)
    const fotoUrl = usuario.fotoUrl || `/usuarios/${userId}/foto`;
    const fotoResp = await fetch(fotoUrl, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (fotoResp.ok) {
      const blob = await fotoResp.blob();
      const objectUrl = URL.createObjectURL(blob);
      avatar.src = objectUrl;
      avatar.onload = () => URL.revokeObjectURL(objectUrl); // liberar memória
    } else {
      avatar.src = './assets/avatar-placeholder.png';
    }
    avatar.alt = `Foto de ${usuario.nome || 'usuário'}`;
  } catch (err) {
    console.error('Erro ao carregar usuário', err);
    avatar.src = './assets/avatar-placeholder.png';
  }
}

document.addEventListener('DOMContentLoaded', carregarAsideUsuario);