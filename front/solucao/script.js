// Seleciona o botão de salvar pelo seu ID, que será usado para abrir o modal
const abrirModal = document.getElementById("saveButton");

// Seleciona o elemento <dialog>, que será usado como o modal
const modal = document.querySelector("dialog");

// Seleciona o botão de fechar modal pelo seu ID, que será usado para fechar o modal
const fecharModal = document.getElementById("closeModal");

// Adiciona um evento de clique ao botão de salvar
abrirModal.onclick = function (){
  // Abre o modal usando o método showModal() do elemento <dialog>
  modal.showModal()
}

// Adiciona um evento de clique ao botão de fechar modal
fecharModal.onclick = function (){
  // Fecha o modal usando o método close() do elemento <dialog>
  modal.close()
}



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idRisco = urlParams.get('id');


async function registrarSolucao(){

  const registro = [{
    "estrategia": document.getElementById('estrategia').value,
    "probabilidade_Residual": document.getElementById('probabilidadeResidual').value,
    "impacto_Resudual": document.getElementById('impactoResidual').value,
    "validacao_Acao": document.getElementById('validacaoAcao').value,
    "validacao_Risco": document.getElementById('validacaoRisco').value,
    "data_Alerta": document.getElementById('dataAlerta').value,
    "nome_Piloto": document.getElementById('nomePiloto').value,
    "id_Piloto": document.getElementById('idPiloto').value,
    "capitalizacao": document.getElementById('capitalizacao').checked,
    "inicio_Plano_De_Acao": document.getElementById('dataPlanoAcao').value,
    "acao": document.getElementById('acao').value,
    "comentario": document.getElementById('comentario').value,
    "data_Resolucao": document.getElementById('dataResolucao').value,
    "id_Risco": idRisco
  }];

  try{
    // Criar requisição com o corpo
    let response = await fetch('https://api-risk-manager-renault.onrender.com/solution',{
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

// Evento para rodar a função quando a página carregar
document.getElementById("saveButton").addEventListener("click", registrarSolucao);