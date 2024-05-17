function substituirNomeUsuario() {

  // Definir a variável com o nome do usuário
  var nome = "Natasha Fonseca";

  // Selecionar todos os elementos com a classe 'nome'
  var elementos = document.querySelectorAll(".nome");

  // Substituir o texto dentro de cada elemento pelo nome
  elementos.forEach(function(elemento) {
      elemento.textContent = nome;
  });
}

// Evento para rodar a função quando a página carregar
window.addEventListener('DOMContentLoaded', substituirNomeUsuario);


// Gerar lista de riscos para teste
const riscos = [
  {
    id: '001',
    imgSrc: '../images/veiculos/kwid.png',
    risco: 'Ausência de critério TCS ou presença ...',
    dataFinal: '15/05/2024'
  },
  {
    id: '002',
    imgSrc: '../images/veiculos/duster.png',
    risco: 'Presença de critério ABS ou ausência ...',
    dataFinal: '20/05/2024'
  },
];

// Incluir cada risco em uma linha da tabela
riscos.forEach(risco => {
  // Definir os valores das variárveis
  var image = risco.imgSrc;
  var descricao = risco.risco;
  var dataFinal = risco.dataFinal;
  
  // Criar nova linha na memoria
  const tb = document.querySelector('#tbVeiculos tbody');
  var qtdLinhas = tb.rows.length;
  var linha = tb.insertRow(qtdLinhas);
  console.log(`Número da linha inserida: ${qtdLinhas}`);

  // Identificar as colunas
  var cellImage = linha.insertCell(0);
  var cellRisco = linha.insertCell(1);
  var cellData = linha.insertCell(2);

  // Atribuir valor nas colunas
  cellImage.innerHTML = `<td scope="row"><img src="${image}" alt="Imagem Kwid"></td>`;
  cellRisco.innerHTML = descricao;
  cellData.innerHTML = dataFinal;

  // Incluir classe
  cellRisco.className = "text-start text-wrap"

  // Incluir Atributo
  cellImage.setAttribute('scope', 'row');
  linha.setAttribute('onclick', 'location.href="inicio2.html"');
  linha.id = qtdLinhas+1;
});