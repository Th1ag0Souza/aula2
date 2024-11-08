// Variáveis para controlar o estado do jogo
let perguntaAtual = 0;
let placar = 0;

// Lista de perguntas
const perguntas = [
    { pergunta: "Quem escreveu 'Dom Quixote'?", opcoes: ["Miguel de Cervantes", "William Shakespeare", "Dante Alighieri", "Victor Hugo"], respostaCorreta: 0, valor: 1000, audio: "audio1000" },
    { pergunta: "Qual é o animal terrestre mais rápido?", opcoes: ["Cavalo", "Guepardo", "Leão", "Águia"], respostaCorreta: 1, valor: 2000, audio: "audio2000" },
    { pergunta: "Quem foi o primeiro presidente dos EUA?", opcoes: ["Thomas Jefferson", "John Adams", "George Washington", "Abraham Lincoln"], respostaCorreta: 2, valor: 3000, audio: "audio3000" },
    { pergunta: "Quantos elementos há na tabela periódica?", opcoes: ["108", "118", "128", "138"], respostaCorreta: 1, valor: 4000, audio: "audio4000" },
    { pergunta: "Em que ano começou a Segunda Guerra Mundial?", opcoes: ["1935", "1939", "1941", "1945"], respostaCorreta: 1, valor: 5000, audio: "audio5000" },
    { pergunta: "Qual é o maior país do mundo em área territorial?", opcoes: ["China", "Canadá", "Estados Unidos", "Rússia"], respostaCorreta: 3, valor: 10000, audio: "audio10000" },
    { pergunta: "Qual é o menor osso do corpo humano?", opcoes: ["Fíbula", "Estribo", "Rádio", "Vértebra"], respostaCorreta: 1, valor: 20000, audio: "audio20000" },
    { pergunta: "Quem pintou 'O Grito'?", opcoes: ["Edvard Munch", "Claude Monet", "Pablo Picasso", "Salvador Dalí"], respostaCorreta: 0, valor: 30000, audio: "audio30000" },
    { pergunta: "Em que cidade está localizada a Torre Eiffel?", opcoes: ["Londres", "Roma", "Paris", "Berlim"], respostaCorreta: 2, valor: 40000, audio: "audio40000" },
    { pergunta: "Qual é o maior órgão do corpo humano?", opcoes: ["Coração", "Pulmão", "Fígado", "Pele"], respostaCorreta: 3, valor: 50000, audio: "audio50000" },
    { pergunta: "Qual é o país conhecido como Terra do Sol Nascente?", opcoes: ["China", "Coreia do Sul", "Japão", "Tailândia"], respostaCorreta: 2, valor: 100000, audio: "audio100000" },
    { pergunta: "Quantos graus tem um ângulo reto?", opcoes: ["90", "180", "45", "360"], respostaCorreta: 0, valor: 200000, audio: "audio200000" },
    { pergunta: "Quem é o autor da série de livros 'Harry Potter'?", opcoes: ["J.K. Rowling", "George R.R. Martin", "J.R.R. Tolkien", "Stephen King"], respostaCorreta: 0, valor: 300000, audio: "audio300000" },
    { pergunta: "Qual é a fórmula química do sal de cozinha?", opcoes: ["H2O", "NaCl", "CO2", "KCl"], respostaCorreta: 1, valor: 400000, audio: "audio400000" },
    { pergunta: "Qual planeta é conhecido como o Planeta Vermelho?", opcoes: ["Terra", "Marte", "Júpiter", "Saturno"], respostaCorreta: 1, valor: 500000, audio: "audio500000" },
    { pergunta: "Quem foi o cientista que formulou a teoria da relatividade?", opcoes: ["Isaac Newton", "Galileu Galilei", "Albert Einstein", "Niels Bohr"], respostaCorreta: 2, valor: 1000000, audio: "audio1000000" }
];



// Selecionando elementos do DOM
const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.querySelector('.game-container');
const audioAbertura = document.getElementById('audioAbertura');
const audioErrou = document.getElementById('audioErrou');
const audioGanhou = document.getElementById('audioGanhou');
const audioParabens = document.getElementById('audioParabens');
const mensagem = document.getElementById("mensagem"); // Elemento para mostrar mensagem ao usuário

// Toca o áudio de abertura quando a página é carregada
window.onload = function() {
    const audioAbertura = new Audio('assets/audio/abertura-show-do-milhao.mp3');
    audioAbertura.play().catch(error => {
        console.log("Autoplay falhou devido às restrições do navegador.", error);
    });
};

// Escuta o evento de clique no botão de iniciar
startButton.addEventListener("click", function() {
    startScreen.style.display = "none"; // Esconde a tela de início
    gameContainer.style.display = "flex"; // Mostra a tela do jogo
    exibirPergunta(); // Chama a função para exibir a primeira pergunta
});

// Função para exibir a pergunta atual
function exibirPergunta() {
    mensagem.innerText = "";
    const pergunta = perguntas[perguntaAtual];
    document.getElementById("question").innerText = pergunta.pergunta;

    // Exibir opções
    pergunta.opcoes.forEach((opcao, index) => {
        const botaoOpcao = document.getElementById(`option${index + 1}`);
        botaoOpcao.innerText = opcao;
        botaoOpcao.onclick = () => verificarResposta(index);
    });

    // Exibir valor da pergunta
    document.getElementById("score").innerText = `Valendo: R$ ${pergunta.valor}`;

    // Toca o áudio específico da pergunta
    const audioPergunta = document.getElementById(pergunta.audio);
    if (audioPergunta) {
        audioPergunta.play().catch(error => {
            console.error("Erro ao tocar o áudio da pergunta:", error);
        });
    }
}

// Função para verificar a resposta do usuário
function verificarResposta(opcaoSelecionada) {
    const pergunta = perguntas[perguntaAtual];

    if (opcaoSelecionada === pergunta.respostaCorreta) {
        handleAnswer(true, pergunta.valor); // Chama a função de resposta correta
    } else {
        handleAnswer(false);
    }
}

// Função para manipular a resposta do usuário
function handleAnswer(isCorrect, valor) {
    const audioWrong = document.getElementById("audioErrou");

    if (isCorrect) {
        // Verifica se é a última pergunta
        if (perguntaAtual === perguntas.length - 1) {
            // Última pergunta: tocar o áudio de "ganhou" e mostrar a mensagem final
            audioGanhou.play();
            mensagem.innerText = "Parabéns! Você ganhou R$ 1.000.000!";
            setTimeout(finalizarJogo, 2000); // Espera um tempo antes de finalizar o jogo
            return; // Encerra o jogo sem avançar para a próxima pergunta
        } else {
            // Outras perguntas: tocar o áudio de "parabéns" e mostrar a mensagem simples
            audioParabens.play();
            mensagem.innerText = "Parabéns!";
            mensagem.style.color = "green";
        }

        // Atualizar o placar
        placar += valor;
        document.getElementById("score").innerText = `Placar: R$ ${placar}`;
    } else {
        audioWrong.play();
        mensagem.innerText = "Resposta Incorreta!";
        mensagem.style.color = "red";
        placar = 0; // Zera o placar em caso de erro
        resetarJogo();
        return; // Sai da função para evitar chamada do próximo
    }

    // Avança para a próxima pergunta após 2 segundos
    setTimeout(() => {
        perguntaAtual++; // Avança para a próxima pergunta
        if (perguntaAtual < perguntas.length) {
            exibirPergunta(); // Exibe a próxima pergunta
        }
    }, 2000);
}

// Função para finalizar o jogo
function finalizarJogo() {
    gameContainer.style.display = "none";
    document.getElementById("end-screen").style.display = "block";
    document.getElementById("final-message").innerText = "Parabéns! Você ganhou R$ 1.000.000!";
}

// Função para reiniciar o jogo
document.getElementById("restart-button").addEventListener("click", function() {
    document.getElementById("end-screen").style.display = "none";
    startScreen.style.display = "block";
    perguntaAtual = 0;
    placar = 0;
});

// Código para as opções de resposta
document.addEventListener("DOMContentLoaded", () => {
    for (let i = 1; i <= 4; i++) {
        const botaoOpcao = document.getElementById(`option${i}`);
        if (botaoOpcao) {
            botaoOpcao.onclick = () => verificarResposta(i - 1);
        }
    }
});
















