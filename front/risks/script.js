let todosRegistros;
var listaId = [];

var arrayFiltro = {
  'descricaoRisco': '', 
  'projeto': 'Selecione',
  'impacto': 'Selecione',
  'metier': 'Selecione',
  'jalonAfetado': 'Selecione',
  'status': 'Selecione',
};

async function coletarDados(){
	const response  = await fetch('https://api-risk-manager-renault.onrender.com/risk/getAll');
	todosRegistros = await response.json();
  popularTabela(todosRegistros);
}

window.addEventListener('DOMContentLoaded', coletarDados);

async function coletarVeiculos(){
	const response  = await fetch('https://api-risk-manager-renault.onrender.com/risk/filters_project');
	const dados = await response.json();
	return dados;
}

async function coletarMetiers(){
	const response  = await fetch('https://api-risk-manager-renault.onrender.com/risk/filters_metier');
	const dados = await response.json();
	return dados;
}

async function coletarJalon(){
	const response  = await fetch('https://api-risk-manager-renault.onrender.com/risk/filters_jalon');
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

function popularTabela(riscos) {
  // Resetar o array
  listaId = []

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
    if (status == 0){
      status = "Abandonado";
    } else if(status == 1) {
      status = "Em aberto";
    } else if(status == 2) {
      status = "Solucionado";
    }
    
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
    cellImage.className = "text-center transicao";
    cellDescricao.className = "align-middle transicao";
    cellVeiculo.className = "secondary-color align-middle text-center transicao";
    cellImpacto.className = "secondary-color align-middle text-center transicao";
    cellMetier.className = "secondary-color align-middle text-center transicao";
    cellJalon.className = "secondary-color align-middle text-center transicao";
    cellStatus.className = "secondary-color align-middle text-center transicao";
    cellAcessar.className = "align-middle text-end pe-4 transicao"
  
    // Incluir Atributo
    cellImage.setAttribute('scope', 'row');
    linha.setAttribute('onclick', `location.href="../editar_risco/index.html?id=${risco.id}"`);
    linha.id = risco.id;

    // Adicionar o ID da linha na variável
    listaId.push(risco.id);
  })
}

async function popularVeiculos(){
  // Identificar qual o elemento a ter as informações inseridas
  const elemento = document.getElementById("selectVehicle")

  // Puxar os dados que serão inseridos
  const dados = await coletarVeiculos();

  // Adicionar os elementos carregados na Select
  for (let i = 0; i < dados.length; i++) {
    addOption(elemento, i+1, dados[i]);
  }
}

window.addEventListener('DOMContentLoaded', popularVeiculos);

async function popularMetier(){
  // Identificar qual o elemento a ter as informações inseridas
  const elemento = document.getElementById("selectMetier")

  // Puxar os dados que serão inseridos
  const dados = await coletarMetiers();

  // Adicionar os elementos carregados na Select
  for (let i = 0; i < dados.length; i++) {
    addOption(elemento, i+1, dados[i]);
  }
}

window.addEventListener('DOMContentLoaded', popularMetier);

async function popularJalon(){
  // Identificar qual o elemento a ter as informações inseridas
  const elemento = document.getElementById("selectJalon")

  // Puxar os dados que serão inseridos
  const dados = await coletarJalon();

  // Adicionar os elementos carregados na Select
  for (let i = 0; i < dados.length; i++) {
    addOption(elemento, i+1, dados[i]);
  }
}

window.addEventListener('DOMContentLoaded', popularJalon);

function coletarFiltros(){
  limparTabela();

  // Obter o valor do risco
  let risco = document.getElementById("selectRisk").value;

  // Obter valor do Veículo
  let veiculo = devolverValorSelect("selectVehicle");

  // Obter valor do Impacto
  let impacto = devolverValorSelect("selectImpact");

  // Obter valor do Metier
  let metier = devolverValorSelect("selectMetier");

  // Obter valor do Jalon
  let jalon = devolverValorSelect("selectJalon");

  // Obter valor do Status
  let status = document.getElementById("selectStatus").value;

  arrayFiltro.descricaoRisco = risco;
  arrayFiltro.projeto = veiculo;
  arrayFiltro.impacto = impacto;
  arrayFiltro.metier = metier;
  arrayFiltro.jalonAfetado = jalon;
  arrayFiltro.status = status;
  filtrarResultados(arrayFiltro);
}

function filtrarResultados(filtros){
  // Copiar dados do risco
  let riscosFiltrados = todosRegistros;

  // Verificar se tem algum elemento diferente de Vazio ou "selecione" nos filtros
  for (var chave in filtros) {
    if (filtros.hasOwnProperty(chave)) {
      if (filtros[chave] !== '' && filtros[chave] !== 'Selecione'){
        // Verificar quais os resultados que tem o filtro selecionado
        if (chave === 'descricaoRisco') {
          riscosFiltrados = riscosFiltrados.filter((valorAtual) => {
            return valorAtual.descricaoRisco.includes(filtros[chave]);
          })
        } else {
          riscosFiltrados = riscosFiltrados.filter((valorAtual) => {
            return valorAtual[chave] == filtros[chave];
          })
        }
      };
    }
  }
  limparTabela();
  popularTabela(riscosFiltrados);
}

function limparTabela(){
  var tabela = document.querySelectorAll('#tableRisks tbody');

  // Itera sobre todos os elementos tbody encontrados
  tabela.forEach(function(tbody) {
      // Limpa todas as linhas dentro do tbody
      while (tbody.firstChild) {
          tbody.removeChild(tbody.firstChild);
      }
  });

}

function devolverValorSelect(nomeId){
  let elemento = document.getElementById(nomeId);
  let valor = elemento.selectedIndex;
  valor = elemento.options[valor].text
  return valor
}

function addOption(elemento, valor, texto){
  const option = document.createElement("option");
  option.value = valor;
  option.textContent = texto;
  elemento.appendChild(option);
}


document.getElementById('formFilter').addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o comportamento padrão de envio do formulário
});

document.getElementById('download').addEventListener('mouseover', function() {
  document.getElementById('download-icon').src = '../images/riscos/download-preto.png';
});

document.getElementById('download').addEventListener('mouseout', function() {
  document.getElementById('download-icon').src = '../images/riscos/download-amarelo.png';
});






// DOwnload CSV

document.getElementById('download').addEventListener('click', function() {
  // Exemplo de chamada à API para obter dados JSON
  fetch('https://api-risk-manager-renault.onrender.com/risk/getAll')
      .then(response => response.json())
      .then(data => {

        const datateste = [
              {
                  "carro": "Toyota Corolla",
                  "peca_estragada": "Bateria",
                  "data": "2023-01-15"
              },
              {
                  "carro": "Honda Civic",
                  "peca_estragada": "Freios",
                  "data": "2023-02-20"
              },
              {
                  "carro": "Ford Focus",
                  "peca_estragada": "Suspensão",
                  "data": "2023-03-10"
              },
              {
                  "carro": "Chevrolet Cruze",
                  "peca_estragada": "Radiador",
                  "data": "2023-04-05"
              }
          ];


          const csv = convertToCSV(datateste);
          downloadCSV(csv, 'relatorio.csv');
      })
      .catch(error => console.error('Erro ao obter dados:', error));
});

function convertToCSV(objArray) {
  const array = Array.isArray(objArray) ? objArray : [objArray];
  const headers = Object.keys(array[0]);

  const csvRows = [];
  // Adicionar cabeçalhos
  csvRows.push(headers.join(';'));

  // Adicionar dados
  for (const row of array) {
      const values = headers.map(header => {
          const escaped = ('' + row[header]).replace(/"/g, '\\"');
          return `"${escaped}"`;
      });
      csvRows.push(values.join(';'));
  }

  return csvRows.join('\n');
}

function downloadCSV(csv, filename) {
  const BOM = '\uFEFF'; // Byte Order Mark
  const csvBlob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(csvBlob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}




// Dark - mode
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
	elemento = document.getElementById('tableRisks');
	elemento.classList.toggle('custom-bg');

	// ALTERAR CORES DA FONTE //
	// Alterar o Titulo
	elemento = document.getElementById('title-menu');
	elemento.classList.toggle('color-dark');

	// Alterar o Sub-Titulo
	elemento = document.getElementById('sub-title-menu');
	elemento.classList.toggle('color-dark');

	// Alterar a label dos filtros
	elementos = document.getElementsByClassName('name-filter');
  for (elemento of elementos) {
    elemento.classList.toggle('color-dark');
  }

  // Alterar o campo de pesquisa Input
	elemento = document.getElementById('selectRisk');
  elemento.classList.toggle('background-dark-filter');

  // Alterar o campo de pesquisa Select
	elementos = document.getElementsByClassName('form-select');
  for (elemento of elementos) {
    elemento.classList.toggle('background-dark-filter');
  } 
}
