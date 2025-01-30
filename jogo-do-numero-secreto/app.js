// Lista para armazenar os números já sorteados
let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

/**
 * Exibe um texto na tela dentro de um elemento específico.
 * Também usa a API `responsiveVoice` para leitura do texto, se disponível.
 * @param {string} tag - A tag HTML onde o texto será inserido (ex: 'h1', 'p').
 * @param {string} texto - O conteúdo que será exibido.
 */
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    
    if (window.responsiveVoice) {
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
    }
}

/**
 * Exibe a mensagem inicial do jogo na tela.
 */
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 50');
}

// Chama a função para exibir a mensagem inicial assim que o jogo começa
exibirMensagemInicial();

/**
 * Verifica se o número digitado pelo jogador está correto e atualiza a tela.
 */
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

/**
 * Gera um número aleatório entre 1 e o `numeroLimite`, garantindo que não se repita.
 * @returns {number} - Número aleatório único.
 */
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

    // Se todos os números já foram sorteados, reinicia a lista
    if (listaDeNumerosSorteados.length == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    // Se o número já foi sorteado, gera outro
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

/**
 * Limpa o campo de entrada do usuário.
 */
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

/**
 * Reinicia o jogo, sorteando um novo número e resetando as tentativas.
 */
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

/**
 * Adiciona um evento para permitir que a tecla "Enter" também verifique o chute.
 */
document.addEventListener("DOMContentLoaded", function () {
    let input = document.querySelector(".container__input");

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            verificarChute();
        }
    });
});
