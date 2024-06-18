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

// Evento para rodar a função quando a página carregar
window.addEventListener('DOMContentLoaded', substituirNomeUsuario);

function gerarGrafico(grafico){
  new Chart(grafico, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
				x: {
					grid: {
						display: false,
					}
				},
				y: {
					beginAtZero: true,
					grid: {
						display: false,
					},
					ticks: {
						stepSize: 1,
					}
				},
			}
    }
  });
}

function listagraficos(){
  let graficos = document.getElementsByTagName('canvas'); // Corrigir o seletor para 'canvas'

  // Converter HTMLCollection para Array para usar forEach
  Array.from(graficos).forEach(grafico => {
    gerarGrafico(grafico);
  });
}

// Evento para rodar a função quando a página carregar
window.addEventListener('DOMContentLoaded', listagraficos);