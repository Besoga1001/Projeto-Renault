let nome = 'inicio';

function rememberMeState(login, senha) {
    const checkbox = document.getElementById("rememberMe");
    const isChecked = checkbox.checked;
    if (isChecked == true) {
        saveDataLocal(login, senha);
    } else {
        localStorage.removeItem('dados');
    }
}

function saveDataLocal(login, senha){
    const dados = {
        usuario: login,
        senha: senha
    }

    localStorage.setItem('dados', JSON.stringify(dados));
}

function saveDataSession(name){
    sessionStorage.setItem('nome', name);
}

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

async function verificarSenha(){
    // Coletar dados do usuário
    const user = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    const resposta = await requisitarNome(user, password);

    console.log(resposta);

    nome = resposta.name;
    let validacao = resposta.valido;

    if (validacao == true){
        saveDataSession(nome);
        rememberMeState(user, password);
        window.location.href = '../home/home.html';
    } else {
        const error = document.getElementById('error');
        error.textContent = 'USUÁRIO E/OU SENHA INCORRETOS';
    }
}

async function requisitarNome(user, senha){
    // Criar um dicionario com os dados de login
    const dados = {
        login: user,
        password: senha
    };

    try{
        // Criar requisição com o corpo
        let response  = await fetch('https://api-risk-manager-renault.onrender.com/user/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Informar que o corpo da requisição é JSON
            },
            body: JSON.stringify(dados)
        });
    
        // Transformar a resposta de JSON para Dict
        let resp = await response.json();
    
        // Retornar o nome e a resposta
        return {
            name: resp.nome,
            valido: resp.sessaoValida
        };

    } catch {
        // Retornar erro
        return {
            name: '',
            valido: false
        };
    }
}


// Preencher auomatico o login ao carregar o Login
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