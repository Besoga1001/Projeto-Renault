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

const riscos = [
	{
		"id": 1,
		"descricaoRisco": "Descrição do risco 1",
		"tipo": "Tipo 1",
		"probabilidade": "Alta",
		"areaResponsavel": "Área 1",
		"classificacaoRisco": "Classe 1",
		"projeto": "Projeto 1",
		"dataEntradaRisco": "2024-05-22T00:00:00",
		"impacto": "Alto",
		"impactoRenault": "Alto",
		"consequencias": "Consequências 1",
		"jalonAfetado": "Jalon 1",
		"metier": "Metier 1",
		"status": 1
	},
	{
		"id": 2,
		"descricaoRisco": "Descrição do risco 2",
		"tipo": "Tipo 2",
		"probabilidade": "Média",
		"areaResponsavel": "Área 2",
		"classificacaoRisco": "Classe 2",
		"projeto": "Projeto 2",
		"dataEntradaRisco": "2024-05-23T00:00:00",
		"impacto": "Médio",
		"impactoRenault": "Médio",
		"consequencias": "Consequências 2",
		"jalonAfetado": "Jalon 2",
		"metier": "Metier 2",
		"status": 2
	}
]

console.log(riscos);

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