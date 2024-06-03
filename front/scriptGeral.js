function coletarNomeUsuario() {
  // Coletar o nome através do Session Storage
  const nome = sessionStorage.getItem('nome');
  return nome;
}

function salvarDarkMode(valor) {
  localStorage.setItem('lightMode', valor);
}
