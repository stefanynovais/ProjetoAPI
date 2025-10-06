const API_URL = "http://localhost:3000";
const form = document.getElementById("questionarioForm");
const msgForm = document.getElementById("msgForm");
let animalId = null;

// Recebe dados do popup (animal selecionado)
window.addEventListener('message', (event) => {
  if (event.data?.type === 'abrirQuestionario') {
    animalId = event.data.animalId;
    const animalNomeEl = document.getElementById('animalNome');
    if (animalNomeEl) animalNomeEl.textContent = event.data.animalNome;
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario || !usuario.id || !usuario.token) {
    msgForm.style.color = "red";
    msgForm.textContent = "Usuário não encontrado. Faça login antes de enviar o questionário.";
    return;
  }

  if (!animalId) {
    msgForm.style.color = "red";
    msgForm.textContent = "Nenhum animal selecionado.";
    return;
  }

  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    if (value === "true") value = true;
    if (value === "false") value = false;
    if (!isNaN(value) && value !== "") value = Number(value);

    if (key === "idades_criancas") {
      value = value.split(",").map(v => v.trim()).filter(v => v !== "");
    }

    data[key] = value;
  });

  data.usuarioId = usuario.id;
  data.animalId = animalId;

  try {
    const response = await fetch(`${API_URL}/questionario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${usuario.token}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      msgForm.style.color = "green";
      msgForm.textContent = "Questionário enviado com sucesso! 🎉";
      form.reset();

      // Avisar popup para fechar
      window.parent.postMessage({ type: 'questionarioEnviado' }, '*');

    } else {
      msgForm.style.color = "red";
      msgForm.textContent = result.erro || "Erro ao enviar questionário.";
    }
  } catch (error) {
    console.error(error);
    msgForm.style.color = "red";
    msgForm.textContent = "Falha na conexão com a API.";
  }
});