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
	let response  = await fetch('https://api-risk-manager-renault.onrender.com/solution/getAll');
	let dados = await response.json();
	return dados;
}

function opcoes(solucao, chave){
	// Coletar apenas os nomes únicos
	const projetosUnicosObj = new Set(solucao.map(solu => solu[chave]));
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

async function solucao(){
    //pega informaçãp da API
    let infoSolucao = await coletarDados();
    //Tipo de Risco
    let projetoUnico = opcoes(infoSolucao, "estrategia"); //API
    adicionarOpcoes(projetoUnico, 'estrategia');
    //Probabilidade
    projetoUnico = opcoes(infoSolucao, "probabilidade_Residual");
    adicionarOpcoes(projetoUnico, 'probabilidadeResidual');
    //Area responsavel
    projetoUnico = opcoes(infoSolucao, "impacto_Resudual");
    adicionarOpcoes(projetoUnico, 'impactoResidual');
    //Classificação
    projetoUnico = opcoes(infoSolucao, "validacao_Acao");
    adicionarOpcoes(projetoUnico, 'validacaoAcao');
    //Projeto
    projetoUnico = opcoes(infoSolucao, "validacao_Risco");
    adicionarOpcoes(projetoUnico, 'validacaoRisco');
    
    infoSolucao = infoSolucao[0];
    console.log(infoSolucao);
    
    //NOME PILOTO
    //informa o campo do dicionario que voce quer puxar no input
    let nomePiloto = infoSolucao.nome_Piloto;
    //Altera o texto do input a partir do ID
    let elemento = document.getElementById('nomePiloto');
    elemento.value = nomePiloto;

    //Id Piloto
    let idPiloto = infoSolucao.id_Piloto;
    let elemento2 = document.getElementById('idPiloto');
    elemento2.value = idPiloto;

    let acao = infoSolucao.acao;
    let elemento3 = document.getElementById('acao');
    elemento3.value = acao;

    let comentario = infoSolucao.comentario;
    let elemento4 = document.getElementById('comentario');
    elemento4.value = comentario;

    let idRisco = infoSolucao.id_risk;
    let elemento5 = document.getElementById('idRisco');
    elemento5.value = idRisco;

    let idSolucao = infoSolucao.id_Solution;
    let elemento6 = document.getElementById('idSolucao');
    elemento6.value = idSolucao;

    let inicioPlano = infoSolucao.inicio_Plano_De_Acao;
    //new Date é um objeto que representa data e hora (sem argumento retorna a data atual. Com argumento é possivel definir um formato especifico) 
    //new Date(dataRisco) está criando um objeto Date usando a data contida na variável dataRisco.
    let dataFormatada = new Date(inicioPlano).toISOString().split('T')[0];
    //O método toISOString() converte o objeto Date em uma string no formato "AAAA-MM-DDTHH:MM ("THH:MM " a hora, minuto e segundo, e "Z" indica o fuso horário UTC.)
    //split() é usado para dividir uma string em um array de substrings com base em um delimitador especificado. É dividido a string no ponto onde aparece o caractere "T". Isso é feito porque, na string gerada pelo método toISOString(), a letra "T" separa a parte da data da parte do tempo.
    let dataInput = document.getElementById('dataPlanoAcao');
    dataInput.value = dataFormatada;

    let dtResolucao = infoSolucao.data_Resolucao;
    let dataFormatada2 = new Date(dtResolucao).toISOString().split('T')[0];
    let dataInput2 = document.getElementById('dataResolucao');
    dataInput2.value = dataFormatada2;
    
    escolherOpcao(infoSolucao.estrategia, 'estrategia');
    escolherOpcao(infoSolucao.probabilidade_Residual, 'probabilidadeResidual');
    escolherOpcao(infoSolucao.impacto_Resudual, 'impactoResidual');
    escolherOpcao(infoSolucao.validacao_Acao, 'validacaoAcao');
    escolherOpcao(infoSolucao.validacao_Risco, 'validacaoRisco');
}

window.addEventListener('DOMContentLoaded', solucao());

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
    const novaSolucao = {
        id_Solution: document.getElementById('idSolucao').value,
        estrategia: document.getElementById('estrategia').value,
        probabilidade_Residual: document.getElementById('probabilidadeResidual').value,
        impacto_Resudual: document.getElementById('impactoResidual').value,
        validacao_Acao: document.getElementById('validacaoAcao').value,
        validacao_Risco: document.getElementById('validacaoRisco').value,
        id_Piloto: document.getElementById('idPiloto').value,
        nome_Piloto: document.getElementById('nomePiloto').value,
        capitalizacao: document.getElementById('capitalizacao').value,
        inicio_Plano_De_Acao: document.getElementById('dataPlanoAcao').value,
        acao: document.getElementById('acao').value,
        comentario: document.getElementById('comentario').value,
        data_Resolucao: document.getElementById('dataResolucao').value,
        id_risk: document.getElementById('idRisco').value
    };
    
    // Chamar função para atualizar os dados no banco de dados
    await atualizarDados(novaSolucao);
});


async function atualizarDados(novaSolucao) {
    try {
        let response = await fetch('https://api-risk-manager-renault.onrender.com/solution', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaSolucao)
        });
        if (response.ok) {
            console.log('Dados atualizados com sucesso.');
            // Atualizar os campos na UI com os novos valores
            document.getElementById('estrategia').value = novaSolucao.estrategia;
            document.getElementById('probabilidadeResidual').value = novaSolucao.probabilidade_Residual;
            document.getElementById('impactoResidual').value = novaSolucao.impacto_Residual;
            document.getElementById('validacaoAcao').value = novaSolucao.validacao_Acao;
            document.getElementById('validacaoRisco').value = novaSolucao.validacao_Risco;
            document.querySelector('input[type="date"]').value = novaSolucao.inicio_Plano_De_Acao;
            document.querySelector('input[type="date"]').value = novaSolucao.data_Resolucao;
            document.getElementById('nomePiloto').value = novaSolucao.nome_Piloto;
            document.getElementById('capitalizacao').value = novaSolucao.capitalizacao;
            document.getElementById('acao').value = novaSolucao.acao;
            document.getElementById('comentario').value = novaSolucao.comentario;
            // Exemplo de mensagem de sucesso
            alert('Dados atualizados com sucesso!');
        } else {
            console.error('Erro ao atualizar dados:', response.statusText);
            alert('Erro ao atualizar dados. Verifique o console para mais detalhes.');
        }
    } catch (error) {
        console.error('Erro durante a requisição:', error);
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


