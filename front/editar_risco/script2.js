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