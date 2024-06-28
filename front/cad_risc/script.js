// Seleciona o botão de cadastro pelo seu ID, que será usado para abrir o modal
const abrirModal = document.getElementById("cadastroButton");

// Seleciona o elemento <dialog>, que será usado como o modal
const modal = document.querySelector("dialog");

// Seleciona o botão de fechar modal pelo seu ID, que será usado para fechar o modal
const fecharModal = document.getElementById("closeModal");

// Adiciona um evento de clique ao botão de cadastro
abrirModal.onclick = function () {
  // Abre o modal usando o método showModal() do elemento <dialog>
  modal.showModal();
}

// Adiciona um evento de clique ao botão de fechar modal
fecharModal.onclick = function () {
  // Fecha o modal usando o método close() do elemento <dialog>
  modal.close();
}


/* FUNCIONALIDADES */
async function coletarDados() {
  let response = await fetch('https://api-risk-manager-renault.onrender.com/risk/getAll');
  let dados = await response.json();
  return dados;
}

function gerarOpcaoUnica(riscos, chave) {
  // Coletar apenas os nomes únicos
  const unicosObj = new Set(riscos.map(risco => risco[chave]));
  const unicosArr = Array.from(unicosObj);
  return unicosArr;
}

function popularSelect(id, dados) {
  const select = document.getElementById(id);

  dados.forEach(dado => {
    // Criar novo elemento de Option
    let novaOpcao = document.createElement("option");

    // Definir valor e texto da nova opção
    novaOpcao.text = dado;

    // Adicionar a nova opção no select
    select.appendChild(novaOpcao);
  })
}

async function carregarSelect() {
  // Obter todos os dados
  const dados = await coletarDados();

  // Criar dict com todos os campos de ID HTML e seu respectivo nome de retorno geral
  const campos = [
    {
      'campoHTML': 'tipoRisco', 'campoRetorno': 'tipo',
    },
    {
      'campoHTML': 'area', 'campoRetorno': 'areaResponsavel',
    },
    {
      'campoHTML': 'classificacao', 'campoRetorno': 'classificacaoRisco',
    },
    {
      'campoHTML': 'projeto', 'campoRetorno': 'projeto',
    },
    {
      'campoHTML': 'impacto', 'campoRetorno': 'impacto',
    },
    {
      'campoHTML': 'impactoRenault', 'campoRetorno': 'impactoRenault',
    },
    {
      'campoHTML': 'jalon', 'campoRetorno': 'jalonAfetado',
    },
    {
      'campoHTML': 'metier', 'campoRetorno': 'metier',
    },
  ]

  // Fazer looping com os dados que precisam ser inseridos
  campos.forEach(campo => {
    // Obter o array com os dados novos
    let arrayAux = gerarOpcaoUnica(dados, campo.campoRetorno);
    popularSelect(campo.campoHTML, arrayAux);
  })

}

window.addEventListener('DOMContentLoaded', carregarSelect);

async function cadastrarRisco() {
  let dataAtual = coletarDataAtual()
  let id_user = localStorage.getItem('id_user');

  const registro = {
    "descricaoRisco": document.getElementById('descRisco').value,
    "tipo": document.getElementById('tipoRisco').value,
    "probabilidade": document.getElementById('probabilidade').value,
    "areaResponsavel": document.getElementById('area').value,
    "classificacaoRisco": document.getElementById('classificacao').value,
    "projeto": document.getElementById('projeto').value,
    "dataEntradaRisco": dataAtual,
    "dataFinalRisco": dataAtual,
    "impacto": document.getElementById('impacto').value,
    "impactoRenault": document.getElementById('impactoRenault').value,
    "consequencias": document.getElementById('impactoConsequencia').value,
    "jalonAfetado": document.getElementById('jalon').value,
    "metier": document.getElementById('metier').value,
    "status": 1,
    "id_usuario": 1
  };

  try {
    // Criar requisição com o corpo
    let response = await fetch('https://api-risk-manager-renault.onrender.com/risk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Informar que o corpo da requisição é JSON
      },
      body: JSON.stringify(registro)
    });

    // Transformar a resposta de JSON para Dict
    let resp = await response.json();

    console.log(resp);

  } catch {
      // Retornar erro
      console.log('não registrado')
  }
}

document.getElementById("cadastroButton").addEventListener("click", cadastrarRisco);


function coletarDataAtual() {
  // Cria um objeto Date para a data e hora atuais
  const data = new Date();

  // Função auxiliar para adicionar zero à esquerda, se necessário
  function adicionarZero(numero) {
    return numero < 10 ? '0' + numero : numero;
  }

  // Coleta os componentes da data
  const ano = data.getFullYear();
  const mes = adicionarZero(data.getMonth() + 1); // Janeiro é 0!
  const dia = adicionarZero(data.getDate());

  // Coleta os componentes da hora
  const horas = adicionarZero(data.getHours());
  const minutos = adicionarZero(data.getMinutes());
  const segundos = adicionarZero(data.getSeconds());

  // Formata a data e hora no formato desejado
  const dataFormatada = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;

  // Exibe a data formatada em um elemento <p> ou realiza outra ação
  return dataFormatada;
}
///////////////////////////////////////////////

//Parte da IA

function checkSupported(value, listaTema) {
  for (let lista of listaTema) {
    if (value === lista) {
      return lista;
    }
  }
  return listaTema[1];
}

function UpdateIA() {
  const valores_validos_area = ['APO', 'DEA-TD'];
  const valores_validos_projeto = ['CARRO 1', 'CARRO 2', 'CARRO 3', 'CARRO 4', 'CARRO 5', 'CARRO 6', 'CARRO 7', 'CARRO 8', 'CARRO 9', 'CARRO 10', 'CARRO 11', 'CARRO 12', 'CARRO 13', 'CARRO 14', 'CARRO 15'];
  const valores_validos_jalon = ['ABDLot-cp', 'ABP', 'ABPT', 'ABVC', 'CO', 'Cp', 'Doc Completion', 'Doc Série', 'MA', 'Nenhum', 'PPC', 'TDU', 'TGA'];

  let area = document.getElementById('area').value;
  let jalon = document.getElementById('jalon').value;
  let projeto = document.getElementById('projeto').value;

  console.log(area);
  console.log(jalon);
  console.log(projeto);

  area = checkSupported(area, valores_validos_area);
  projeto = checkSupported(projeto, valores_validos_projeto);
  jalon = checkSupported(jalon, valores_validos_jalon);

  console.log(area);
  console.log(jalon);
  console.log(projeto);

  document.getElementById('area').value = area;
  document.getElementById('jalon').value = jalon;
  document.getElementById('projeto').value = projeto;

  const data = {
    area: area,
    projeto: projeto,
    jalon: jalon,
  };

  fetch('http://localhost:5000/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json(), console.log("0"))
    .then(data => {
      if (data.error) {
        console.log("1")
        console.error(`Error from server: ${data.error}`);
    } else {
        console.log(data.prediction)
        const classificacaoSelect = document.getElementById('classificacao');
        const impactoSelect = document.getElementById('impactoRenault');
        const options = classificacaoSelect.options;
        const impactooptions = impactoSelect.options;
        for (let i = 0; i < options.length; i++) {
          if (options[i].value == data.prediction) {
                classificacaoSelect.selectedIndex = i;
                impactooptions.selectedIndex = i
                break;
            }
        }
    }
    })
    .catch(error => {
        console.log("3")
        console.error(`Error fetching data: ${error}`);
    });
}

