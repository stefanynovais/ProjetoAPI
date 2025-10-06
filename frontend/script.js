
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