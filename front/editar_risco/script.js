function alterarNome(){
    //Pega o nome através da função
    const name = coletarNomeUsuario();

    // Identifica o elemento a ser modificado
    const elemento = document.getElementById('nome');

    // Altera o Texto do elemento
    elemento.textContent = name;
}

window.addEventListener('DOMContentLoaded', alterarNome());

async function coletarDados(){
	let response  = await fetch('https://api-risk-manager-renault.onrender.com/risk/getAll');
	let dados = await response.json();
	return dados;
}

function opcoes(riscos, chave){
	// Coletar apenas os nomes únicos
	const projetosUnicosObj = new Set(riscos.map(risco => risco[chave]));
	const projetosUnicosArr = Array.from(projetosUnicosObj);
	//console.log(projetosUnicosArr);
	return projetosUnicosArr;
}

function adicionarOpcoes(unicos, id) {
    const select = document.getElementById(id);

    unicos.forEach(opcao => {
        const novaOpcao = document.createElement('option');
        //console.log(opcao);
        novaOpcao.text = opcao;
        select.appendChild(novaOpcao);
    });
}


async function risco(){
    //pega informaçãp da API
    let infoRisco = await coletarDados();
    //Tipo de Risco
    let projetoUnico = opcoes(infoRisco, "tipo");
    adicionarOpcoes(projetoUnico, 'tipoRisco');
    //Probabilidade
    projetoUnico = opcoes(infoRisco, "probalidade");
    adicionarOpcoes(projetoUnico, 'probabilidade');
    //Area responsavel
    projetoUnico = opcoes(infoRisco, "areaResponsavel");
    adicionarOpcoes(projetoUnico, 'area');
    //Classificação
    projetoUnico = opcoes(infoRisco, "classificacaoRisco");
    adicionarOpcoes(projetoUnico, 'classificacao');
    //Projeto
    projetoUnico = opcoes(infoRisco, "projeto");
    adicionarOpcoes(projetoUnico, 'projeto');
    //Impacto
    projetoUnico = opcoes(infoRisco, "impacto");
    adicionarOpcoes(projetoUnico, 'impacto');
    //Impacto Renault
    projetoUnico = opcoes(infoRisco, "impactoRenault");
    adicionarOpcoes(projetoUnico, 'impactoRenault');
    //Jalon
    projetoUnico = opcoes(infoRisco, "jalonAfetado");
    adicionarOpcoes(projetoUnico, 'jalon');
    //Metier
    projetoUnico = opcoes(infoRisco, "metier");
    adicionarOpcoes(projetoUnico, 'metier');
    
    
    //pega o primeiro risco
    infoRisco = infoRisco[0];
    console.log(infoRisco);
    //DESCRIÇÃO DO RISCO
    //informa o campo do dicionario que voce quer puxar no input
    let descricao = infoRisco.descricaoRisco;
    //Altera o texto do input a partir do ID
    let elemento = document.getElementById('descRisco');
    elemento.value = descricao;

    let id = infoRisco.id;
    let elemento3 = document.getElementById('idRisco');
    elemento3.value = id;

    let status = infoRisco.status;
    let elemento4 = document.getElementById('status');
    elemento4.value = status;

    let idUsuario = infoRisco.status;
    let elemento5 = document.getElementById('idUsuario');
    elemento5.value = idUsuario;

    let idSolucao = infoRisco.status;
    let elemento6 = document.getElementById('idSolucao');
    elemento6.value = idSolucao;

    escolherOpcao(infoRisco.tipo, 'tipoRisco');
    escolherOpcao(infoRisco.probabilidade, 'probabilidade');
    escolherOpcao(infoRisco.areaResponsavel, 'area');
    escolherOpcao(infoRisco.classificacaoRisco, 'classificacao');
    escolherOpcao(infoRisco.projeto, 'projeto');
    escolherOpcao(infoRisco.impacto, 'impacto');
    escolherOpcao(infoRisco.impactoRenault, 'impactoRenault');
    escolherOpcao(infoRisco.jalonAfetado, 'jalon');
    escolherOpcao(infoRisco.metier, 'metier');
    
    let consequencia = infoRisco.consequencias;
    let elemento2 = document.getElementById('impactoConsequencia');
    elemento2.value = consequencia;

    //var data = document.querySelector('input[type="date"]');
    //data.value = "2017-06-01";

    let dataRisco = infoRisco.dataEntradaRisco;
    //new Date é um objeto que representa data e hora (sem argumento retorna a data atual. Com argumento é possivel definir um formato especifico) 
    //new Date(dataRisco) está criando um objeto Date usando a data contida na variável dataRisco.
    let dataFormatada = new Date(dataRisco).toISOString().split('T')[0];
    //O método toISOString() converte o objeto Date em uma string no formato "AAAA-MM-DDTHH:MM ("THH:MM " a hora, minuto e segundo, e "Z" indica o fuso horário UTC.)
    //split() é usado para dividir uma string em um array de substrings com base em um delimitador especificado. É dividido a string no ponto onde aparece o caractere "T". Isso é feito porque, na string gerada pelo método toISOString(), a letra "T" separa a parte da data da parte do tempo.
    let dataInput = document.getElementById('data');
    dataInput.value = dataFormatada;
    

}
window.addEventListener('DOMContentLoaded', risco());

function escolherOpcao(item, nomeID){
    let elemento = document.getElementById(nomeID);
    for (let i = 0; i < elemento.options.length; i++) {
        //Verifica se o texto da opção atual corresponde ao tipo de risco
        if (elemento.options[i].text == item) { 
            //Define a opção atual como selecionada se houver uma correspondência
            elemento.selectedIndex = i;
            break;
        }
    }
}


document.getElementById('saveButton').addEventListener('click', async function() {
    const novoRisco = {
        id: document.getElementById('idRisco').value,
        descricaoRisco: document.getElementById('descRisco').value,
        tipo: document.getElementById('tipoRisco').value,
        probabilidade: document.getElementById('probabilidade').value,
        areaResponsavel: document.getElementById('area').value,
        classificacaoRisco: document.getElementById('classificacao').value,
        projeto: document.getElementById('projeto').value,
        dataEntradaRisco: document.getElementById('data').value,
        impacto: document.getElementById('impacto').value,
        impactoRenault: document.getElementById('impactoRenault').value,
        consequencias: document.getElementById('impactoConsequencia').value,
        jalonAfetado: document.getElementById('jalon').value,
        metier: document.getElementById('metier').value,
        status: document.getElementById('status').value,
        id_usuario: document.getElementById('idUsuario').value,
        id_solution: document.getElementById('idSolucao').value
    };
    
    // Chamar função para atualizar os dados no banco de dados
    await atualizarDados(novoRisco);
});


async function atualizarDados(novoRisco) {
    try {
        let response = await fetch('https://api-risk-manager-renault.onrender.com/risk', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoRisco)
        });
        if (response.ok) {
            console.log('Dados atualizados com sucesso.');

            // Atualizar os campos na UI com os novos valores
            document.getElementById('descRisco').value = novoRisco.descricaoRisco;
            document.getElementById('tipoRisco').value = novoRisco.tipo;
            document.getElementById('probabilidade').value = novoRisco.probabilidade;
            document.getElementById('area').value = novoRisco.areaResponsavel;
            document.getElementById('classificacao').value = novoRisco.classificacaoRisco;
            document.getElementById('projeto').value = novoRisco.projeto;
            document.querySelector('input[type="date"]').value = novoRisco.dataEntradaRisco;
            document.getElementById('impacto').value = novoRisco.impacto;
            document.getElementById('impactoRenault').value = novoRisco.impactoRenault;
            document.getElementById('impactoConsequencia').value = novoRisco.consequencias;
            document.getElementById('jalon').value = novoRisco.jalonAfetado;
            document.getElementById('metier').value = novoRisco.metier;
            // Exemplo de mensagem de sucesso
            alert('Dados atualizados com sucesso!');
        } else {
            console.error('Erro ao atualizar dados:', response.statusText);
            alert('Erro ao atualizar dados. Verifique o console para mais detalhes.');
        }
    } catch (error) {
        console.log(response);
        alert('Erro durante a requisição. Verifique o console para mais detalhes.');
    }
}


document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário
  });


document.addEventListener('DOMContentLoaded', () => {
    // Inicialmente desabilita todos os elementos com a classe 'editarInput'
    document.querySelectorAll('.editarInput').forEach(input => {
        input.disabled = true;
    });
    
    function Inputs(editar) {
        // Seleciona todos os elementos com a classe 'editarInput' e define seu estado 'disabled'
        document.querySelectorAll('.editarInput').forEach(input => {
            input.disabled = !editar;
        });

        // Alterna a visibilidade dos botões "Editar" e "Salvar"
        document.getElementById('editButton').style.display = editar ? 'none' : 'inline';
        document.getElementById('saveButton').style.display = editar ? 'inline' : 'none';
    }

    // Adiciona event listener para o botão "Editar"
    document.getElementById('editButton').addEventListener('click', () => Inputs(true));

    // Adiciona event listener para o botão "Salvar"
    document.getElementById('saveButton').addEventListener('click', () => Inputs(false));
});

URLSearchParams(window.location.search)
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

