// Seleciona o botão de cadastro pelo seu ID, que será usado para abrir o modal
const abrirModal = document.getElementById("cadastroButton");

// Seleciona o elemento <dialog>, que será usado como o modal
const modal = document.querySelector("dialog");

// Seleciona o botão de fechar modal pelo seu ID, que será usado para fechar o modal
const fecharModal = document.getElementById("closeModal");

// Adiciona um evento de clique ao botão de cadastro
abrirModal.onclick = function (){
  // Abre o modal usando o método showModal() do elemento <dialog>
  modal.showModal()
}

// Adiciona um evento de clique ao botão de fechar modal
fecharModal.onclick = function (){
  // Fecha o modal usando o método close() do elemento <dialog>
  modal.close()
}


