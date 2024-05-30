async function coletarDados(){
	const response  = await fetch('https://api-risk-manager-renault.onrender.com/risk/getAll');
	const dados = await response.json();
	return dados;
}

async function coletarVeiculos(){
	const response  = await fetch('https://api-risk-manager-renault.onrender.com/Risk/filters_project');
	const dados = await response.json();
	return dados;
}

async function coletarMetiers(){
	const response  = await fetch('https://api-risk-manager-renault.onrender.com/Risk/filters_metier');
	const dados = await response.json();
	return dados;
}

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

// Evento para rodar a função quando a página carregar de puxar o nome de usuário
window.addEventListener('DOMContentLoaded', substituirNomeUsuario);

function ajustarTamanhoContainerTable () {
  // Coletar o elemento do Container Table
  const containerTabela = document.getElementById("containerTable");

  // Coletar a altura atual do container do filtro
  var alturaContainerFiltro = document.getElementById("containerFiltro").offsetHeight;
  var alturaContainerconteudo = document.getElementById("containerConteudo").offsetHeight;

  // Alterar o valor da Altura
  containerTabela.style.maxHeight = `calc(${alturaContainerconteudo}px - ${alturaContainerFiltro}px)`;
}

// Evento para quando alterar o tamanho da tela ajustar o tamanho do container
window.addEventListener('resize', ajustarTamanhoContainerTable);
window.addEventListener('DOMContentLoaded', ajustarTamanhoContainerTable);

async function popularTabela() {
  const riscos = await coletarDados();

  // Incluir cada risco em uma linha da tabela
  riscos.forEach(risco => {
    // Definir os valores das variárveis
    var image = risco.projeto.replace(" ", "");
    var descricao = risco.descricaoRisco;
    var veiculo = risco.projeto;
    var impacto = risco.impacto;
    var metier = risco.metier;
    var jalon = risco.jalonAfetado;
    var status = risco.status;
    
    // Criar nova linha na memoria
    const tb = document.querySelector('#tableRisks tbody');
    var qtdLinhas = tb.rows.length;
    var linha = tb.insertRow(qtdLinhas);
  
    // Identificar as colunas
    var cellImage = linha.insertCell(0);
    var cellDescricao = linha.insertCell(1);
    var cellVeiculo = linha.insertCell(2);
    var cellImpacto = linha.insertCell(3);
    var cellMetier = linha.insertCell(4);
    var cellJalon = linha.insertCell(5);
    var cellStatus = linha.insertCell(6);
    var cellAcessar = linha.insertCell(7);
  
    // Atribuir valor nas colunas
    cellImage.innerHTML = `<img src="../images/veiculos/${image}.png" alt="Imagem ${image}">`;
    cellDescricao.innerHTML = descricao;
    cellVeiculo.innerHTML = veiculo;
    cellImpacto.innerHTML = impacto;
    cellMetier.innerHTML = metier;
    cellJalon.innerHTML = jalon;
    cellStatus.innerHTML = status;
    cellAcessar.innerHTML = `<img src="../images/riscos/acessar_risco.png" alt="Ícone de acessar risco"></img>`
  
    // Incluir classe
    cellImage.className = "text-center";
    cellDescricao.className = "align-middle";
    cellVeiculo.className = "secondary-color align-middle text-center";
    cellImpacto.className = "secondary-color align-middle text-center";
    cellMetier.className = "secondary-color align-middle text-center";
    cellJalon.className = "secondary-color align-middle text-center";
    cellStatus.className = "secondary-color align-middle text-center";
    cellAcessar.className = "align-middle text-end pe-4"
  
    // Incluir Atributo
    cellImage.setAttribute('scope', 'row');
    linha.setAttribute('onclick', 'location.href="inicio2.html"');
    linha.id = qtdLinhas+1;
  });

}

window.addEventListener('DOMContentLoaded', popularTabela);

console.log(coletarVeiculos());