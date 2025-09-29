//animações e as transições entre as telas (login e cadastro)
/*const container = document.getElementById('container');
document.getElementById('signUp').addEventListener('click', () => {
  container.classList.add('right-panel-active');
});
document.getElementById('signIn').addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

//fazer com que os interesses sejam selecionados (no máximo 3) e redirecionados
let totalSelecionados = 0;

function alternarSelecao(elemento) {
  if (elemento.classList.contains("selecionado")) {
    elemento.classList.remove("selecionado");
    totalSelecionados--;
  } else if (totalSelecionados < 3) {
    elemento.classList.add("selecionado");
    totalSelecionados++;
  }
}


function enviarInteresses() {
  const selecionados = [...document.querySelectorAll('#lista-interesses li.selecionado')]
    .map(el => el.textContent);

  if (selecionados.length !== 3) {
    alert("Por favor, selecione exatamente 3 interesses.");
    return;
  }

  console.log("Interesses selecionados:", selecionados);

  // redireciona para tela final depois de 1 segundo
  setTimeout(() => {
    window.location.href = "homepage.html";
  }, 1000);
}

document.querySelectorAll("#lista-interesses li").forEach((item) => {
  item.addEventListener("click", () => alternarSelecao(item));
});*/

//fazer com que os interesses sejam selecionados (no máximo 3) e redirecionados
let totalSelecionados = 0;

function alternarSelecao(elemento) {
  if (elemento.classList.contains("selecionado")) {
    elemento.classList.remove("selecionado");
    totalSelecionados--;
  } else if (totalSelecionados < 3) {
    elemento.classList.add("selecionado");
    totalSelecionados++;
  }
}

function enviarInteresses() {
  const selecionados = [...document.querySelectorAll('#lista-interesses li.selecionado')]
    .map(el => el.textContent);

  //verificar se há realmente 3 selecionados
  if (selecionados.length !== 3) {
    alert("Por favor, selecione exatamente 3 interesses.");
    return;
  }

  console.log("Interesses selecionados:", selecionados);

  // redireciona automaticamente quando os três forem escolhidos
  if (selecionados.length === 3) {
    setTimeout(() => {
      window.location.href = "homepage.html"; // Redireciona para a tela final
    }, 1000); // Aguarda 1 segundo antes de redirecionar
  }
}


