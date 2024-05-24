function substituirNomeUsuario() {
  // Coletar o nome do usuário salvo no Session Storage
  var nome = coletarNomeUsuario();

  // Selecionar todos os elementos com a classe 'nome'
  var elementos = document.querySelectorAll(".nome");

  // Substituir o texto dentro de cada elemento pelo nome
  elementos.forEach(function(elemento) {
      elemento.textContent = nome;
  });
}


function ajustarTamanhoContainerTable () {
  // Coletar a altura atual do container do filtro
  const alturaContainerFiltro = document.getElementById("containerFiltro").offsetHeight;

  // Coletar o elemento do Container Table
  const alturaContainerTabela = document.getElementById("containerTable");

  // Alterar o valor da Altura
  alturaContainerTabela.style.height = `calc(100% - ${alturaContainerFiltro}px)`;
}

// Evento para rodar a função quando a página carregar de puxar o nome de usuário
window.addEventListener('DOMContentLoaded', substituirNomeUsuario);

// Evento para quando alterar o tamanho da tela ajustar o tamanho do container
window.addEventListener('resize', ajustarTamanhoContainerTable);
window.addEventListener('DOMContentLoaded', ajustarTamanhoContainerTable);