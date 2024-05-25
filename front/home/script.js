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

// fetch('http://localhost:8080/risk/getAll')
//   .then(response => response.json())
//   .then(data => {
//     const riscos = data;
//   })
//   .catch(error => {
//     console.log('Deu erro');
//   });

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
  cellRisco.className = "text-start";

  // Incluir Atributo
  cellImage.setAttribute('scope', 'row');
  linha.setAttribute('onclick', 'location.href="../editar_risco/index.html"');
  linha.id = qtdLinhas+1;
});