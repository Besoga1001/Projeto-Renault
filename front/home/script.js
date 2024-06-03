async function coletarDados(){
	let response  = await fetch('https://api-risk-manager-renault.onrender.com/risk/getAll');
	let dados = await response.json();
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

// Evento para rodar a função quando a página carregar
window.addEventListener('DOMContentLoaded', substituirNomeUsuario);

async function inserirGrafico(){
	// Puxar os dados necessários
	let dados = await coletarDados();

	// Criar um Object com os nomes dos projetos
	var nomeInfo = gerarLabel(dados);

	// Criar um Array com quantas vezes os projetos aparecem
	var valorInfo = gerarNúmeros(dados, nomeInfo);
	
	// Transformar Object em Array
	nomeInfo = Array.from(nomeInfo);

	// Criar o Gráfico
	const ctx = document.getElementById('myChart');
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: nomeInfo,
			datasets: [{
				label: 'Número de riscos',
				data: valorInfo,
				borderWidth: 0
			}]
		},
		options: {
			scales: {
				x: {
					grid: {
						display: false,
					}
				},
				y: {
					beginAtZero: true,
					grid: {
						display: false,
					},
					ticks: {
						stepSize: 1,
					}
				},
			}
		}
	});
}

// Evento para rodar a função quando a página carregar
window.addEventListener('DOMContentLoaded', inserirGrafico);

function gerarLabel(riscos){
	// Coletar apenas os nomes únicos
	const projetosUnicosObj = new Set(riscos.map(risco => risco.projeto));
	const projetosUnicosArr = Array.from(projetosUnicosObj);
	return projetosUnicosArr;
}

function gerarNúmeros(riscos, infoUnica){
	// criar um array para os retornos
	const contagens = [];

	// Coletar apenas os nomes únicos
	const nomesProjetos = riscos.map(risco => risco.projeto);
	infoUnica.forEach((projeto) => {
		var contagem = nomesProjetos.filter(projetoVerificado => projetoVerificado === projeto).length;
		contagens.push(contagem);
	})
	return contagens;
}

function alterarLarguraContainerGrafico() {
	// Setar container grafico
	const contGrafico = document.getElementById("grafico");

	// Coletar tamanho do container dos cards
	const larguraContCard = document.getElementById("containerCard").offsetWidth;

	// Alterar o tamanho da largura
	contGrafico.style.width = larguraContCard + "px";
}

// Evento para rodar a função quando a página carregar
window.addEventListener('DOMContentLoaded', alterarLarguraContainerGrafico);

// Incluir riscos na tabela
async function popularTabela(){
	// Obter dados
	const riscos = await coletarDados();

	// Incluir cada risco em uma linha da tabela
	riscos.forEach(risco => {
		// Definir os valores das variárveis
		var image = risco.projeto.replace(" ", "");
		var descricao = risco.descricaoRisco;
		var dataFinal = risco.dataFinal;

		
		// Criar nova linha na memoria
		const tb = document.querySelector('#tbVeiculos tbody');
		var qtdLinhas = tb.rows.length;
		var linha = tb.insertRow(qtdLinhas);

		// Identificar as colunas
		var cellImage = linha.insertCell(0);
		var cellRisco = linha.insertCell(1);
		var cellData = linha.insertCell(2);

		// Atribuir valor nas colunas
		cellImage.innerHTML = `<td scope="row"><img src="../images/veiculos/${image}.png" alt="Imagem ${image}"></td>`;
		cellRisco.innerHTML = descricao;
		cellData.innerHTML = dataFinal;

		// Incluir classe
		cellRisco.className = 'text-start transicao';
		linha.className = 'transicao';
		cellImage.className = 'transicao';
		cellData.className = 'transicao';

		// Incluir Atributo
		cellImage.setAttribute('scope', 'row');
		linha.setAttribute('onclick', 'location.href="../editar_risco/index.html"');
		linha.id = qtdLinhas+1;
	});
}

// Evento para rodar a função quando a página carregar
window.addEventListener('DOMContentLoaded', popularTabela);

function ajustarTamanhoContainerTable () {
  // Coletar o elemento do Container Table
  const containerTabela = document.getElementById("containerTable");

  // Coletar a altura atual do container do filtro
  var alturaContainerFiltro = document.getElementById("containerFiltro").offsetHeight;
  var alturaContainerconteudo = document.getElementById("containerConteudo").offsetHeight;

  console.log(alturaContainerconteudo);
  console.log(alturaContainerFiltro);
  console.log(alturaContainerconteudo - alturaContainerFiltro);

  // Alterar o valor da Altura
  containerTabela.style.maxHeight = `calc(${alturaContainerconteudo}px - ${alturaContainerFiltro}px)`;
}

// Evento para quando alterar o tamanho da tela ajustar o tamanho do container
window.addEventListener('resize', ajustarTamanhoContainerTable);
window.addEventListener('DOMContentLoaded', ajustarTamanhoContainerTable);



let modo = document.getElementById('toggle')

modo.addEventListener('change', () => {
  alterarDarkMode();
});

function verificarDarkMode(valor){	
  let elemento = document.getElementById('toggle');
  if (valor == 'false'){
    elemento.checked = false;
    elemento.dispatchEvent(new Event('change'));
	} else {
    elemento.checked = true;
  }
}

window.addEventListener('DOMContentLoaded', verificarDarkMode(localStorage.getItem('lightMode')));

function alterarDarkMode() {
	// Alterar o Background color do Body
	let elemento = document.getElementById('corpo');
	elemento.classList.toggle('background-dark');

	// Alterar o Background color da tabela
	elemento = document.getElementById('tbVeiculos');
	elemento.classList.toggle('custom-bg');

	// ALTERAR CORES DA FONTE //
	// Alterar o Bem Vindo
	elemento = document.getElementById('welcomeUser');
	elemento.classList.toggle('color-dark');

	// Alterar o Bem Vindo
	elemento = document.getElementById('welcome');
	elemento.classList.toggle('color-dark');

	// Alterar parágrafo de Risco Recente
	elemento = document.querySelector('#containerGrafico p');
	elemento.classList.toggle('color-dark');

	// Alterar Legenda tabela
	elemento = document.getElementById('tableLegend');
	elemento.classList.toggle('color-dark');

	// ALTERAR BORDAS DAS DIVS
	// Alterar borda dos riscos
	elemento = document.getElementById('grafico');
	elemento.classList.toggle('border-dark');

	// Alterar borda dos riscos
	elemento = document.getElementById('containerInfoTable');
	elemento.classList.toggle('border-dark');
}