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

async function risco(){
    //pega informaçãp da API
    let infoRisco = await coletarDados();

    //pega o primeiro risco
    infoRisco = infoRisco[0];

    //DESCRIÇÃO DO RISCO
    //informa o campo do dicionario que voce quer puxar no input
    let descricao = infoRisco.descricaoRisco;
    //Altera o texto do input a partir do ID
    let elemento = document.getElementById('descRisco');
    elemento.value = descricao;

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
    let elemento2 = document.getElementById('impacto/consequencia');
    elemento2.value = consequencia;

    //var data = document.querySelector('input[type="date"]');
    //data.value = "2017-06-01";

    let dataRisco = infoRisco.dataEntradaRisco;
    //new Date é um objeto que representa data e hora (sem argumento retorna a data atual. Com argumento é possivel definir um formato especifico) 
    //new Date(dataRisco) está criando um objeto Date usando a data contida na variável dataRisco.
    let dataFormatada = new Date(dataRisco).toISOString().split('T')[0];
    //O método toISOString() converte o objeto Date em uma string no formato "AAAA-MM-DDTHH:MM ("THH:MM " a hora, minuto e segundo, e "Z" indica o fuso horário UTC.)
    //split() é usado para dividir uma string em um array de substrings com base em um delimitador especificado. É dividido a string no ponto onde aparece o caractere "T". Isso é feito porque, na string gerada pelo método toISOString(), a letra "T" separa a parte da data da parte do tempo.
    let dataInput = document.querySelector('input[type="date"]');
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


function Inputs(editar) {
    // Seleciona todos os elementos com a classe 'editable-input'
    document.querySelectorAll('.editarInput').forEach(input => { //forEach é usado para percorrer todos os elementos da página que têm a classe editar-input
        //Se 'editar' for true, 'input.disabled' será false, e vice-versa.
        input.disabled = !editar;
    });
    // Seleciona o botão com id 'editButton' e altera seu estilo de exibição.
    // Se 'editar' for true, o botão 'editButton' será escondido (display: 'none'), caso contrário, será exibido (display: 'inline').
    document.getElementById('editButton').style.display = editar ? 'none' : 'inline';
    // Seleciona o botão com id 'saveButton' e altera seu estilo de exibição para 'inline', tornando-o visível.
}
//Torna o parametro da função 'Inputs' como True então o input.disabled vai ser falso e os inputs se tornam editaveis
document.getElementById('editButton').addEventListener('click', () => Inputs(true));
//Torna o parametro da função 'Inputs' como False então o input.disabled vai ser verdadeiro e os inputs não podem ser mais editados
document.getElementById('saveButton').addEventListener('click', () => Inputs(false));











