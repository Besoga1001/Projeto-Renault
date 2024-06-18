function rememberMeState() {
    const checkbox = document.getElementById("rememberMe");
    const isChecked = checkbox.checked;
    if (isChecked == true) {
        saveDataLocal();
        saveDataSession();
    } else {
        localStorage.removeItem('dados');
    }
}

function saveDataLocal(){
    const user = document.getElementById("login");
    const password = document.getElementById("password");

    const dados = {
        usuario: user.value,
        senha: password.value
    }

    localStorage.setItem('dados', JSON.stringify(dados));
}

function saveDataSession(){
    const nome = "Natasha Fonseca";

    sessionStorage.setItem('nome', nome);
}

function autoFill() {
    const dadosString = localStorage.getItem('dados');
    const dados = JSON.parse(dadosString);

    if(dados != null) {
        document.getElementById("login").value = dados.usuario;
        document.getElementById("password").value = dados.senha;
        document.getElementById("rememberMe").checked = true;
    }
}

document.addEventListener("DOMContentLoaded", autoFill());



// Verificador de senha
document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', function(event) {
        const error = document.getElementById('error');
        error.textContent = '';
        event.preventDefault(); // Previne o envio do formulário
        verificarSenha();
    });
});

function verificarSenha(){
    const user = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    if (user == 'mathguima' && password == '123'){
        window.location.href = '../home/home.html';
    } else {
        const error = document.getElementById('error');
        error.textContent = 'USUÁRIO E/OU SENHA INCORRETOS';
    }
}