// ==================== POPUP ELEMENTS ====================
const popup = document.getElementById('popup');
const popupConfirm = document.getElementById('popup-confirm');
const popupForm = document.getElementById('popup-form');
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const btnBack = document.getElementById('btn-back');
const animalNameEl = document.getElementById('animal-name');
const animalDescEl = document.getElementById('animal-desc');
const animalPhotoEl = document.getElementById('animal-photo');
const iframeForm = document.querySelector('#popup-form iframe');

// ==================== VARIÁVEL GLOBAL DE USUÁRIO ====================
// Aqui você define de onde pega o ID do usuário logado
// Por exemplo, se você tiver um script que define window.usuarioId
// window.usuarioId = 123; 
// ou pegar de algum elemento HTML: document.getElementById('user').dataset.id
const usuarioId = window.usuarioId || 1; // substitua pelo ID real do usuário

// ==================== FUNÇÃO ABRIR POPUP ====================
function abrirPopup(animal) {
  animalNameEl.textContent = animal.nome;
  animalDescEl.textContent = animal.descricao || '';
  animalPhotoEl.src = `http://localhost:3000/animais/${animal.id}/foto`;
  animalPhotoEl.alt = `Foto de ${animal.nome}`;
  animalPhotoEl.onerror = () => animalPhotoEl.src = './assets/fallback.png';

  popupConfirm.classList.remove('hidden');
  popupForm.classList.add('hidden');
  popup.classList.remove('hidden');

  // quando clicar em "Sim", envia IDs para o iframe
  btnYes.onclick = () => {
    popupConfirm.classList.add('hidden');
    popupForm.classList.remove('hidden');

    iframeForm.contentWindow.postMessage({
      tipo: 'abrir-questionario',
      animalId: animal.id,
      usuarioId: usuarioId
    }, '*');
  };
}

// ==================== FUNÇÃO FECHAR POPUP ====================
function fecharPopup() {
  popup.classList.add('hidden');
}

// ==================== EVENTOS DOS BOTÕES ====================
btnNo.addEventListener('click', fecharPopup);

btnBack.addEventListener('click', () => {
  popupForm.classList.add('hidden');
  popupConfirm.classList.remove('hidden');
});

// ==================== RECEBER RETORNO DO IFRAME ====================
window.addEventListener('message', (event) => {
  if (event.data.tipo === 'questionario-enviado') {
    alert('Questionário enviado com sucesso!');
    fecharPopup();
  }
});