// Cores dos botoes 
var cores_botoes = ['vermelho', 'azul', 'verde', 'amarelo'];
// Sequencia real do jogo
var seqJogo = [];
// Sequencia informado pelo user
var userSeqJogo = [];
// Variavel de jogo
var jogo = false;
// Variavel nivel do jogo
var nivel = 0;

// Jquey para detetar quando uma tecla para iniciar o jogo
$(document).keypress(function(){
    if (!jogo){
        // Altera o nome do titulo para Nível e o número correspondente
        $("#level-title").text("Nível "+nivel);
        setTimeout(function () {
            proximaSeq();
        }, 500);
        jogo = true;
    }
});


// Detetar quando o botao é clicado e inicia uma Handler function
$(".btn").click(function() {
    // Criar uma variavel cor escolhida pelo utilizador para guardar o ID do botao clicado
    var corEscolhaUser = $(this).attr("id");
    // Adiciona conteudo a variavel userSeqJogo 
    userSeqJogo.push(corEscolhaUser);
    // Tocar a música do botao clicado pelo utilizador
    playMusica(corEscolhaUser);
    //Muda o estilo do botao
    animarClique(corEscolhaUser);
    // Verificar a resposta do Utilizador
    verificarResposta(userSeqJogo.length-1);
});

// Função para Verificar Resposta
function verificarResposta(nivel_atual){
    // Se a sequencia do jogo for igual a sequencia do utilizador
    if (seqJogo[nivel_atual] === userSeqJogo[nivel_atual]){
        console.log("Certo");
        //Se o tamanho da sequencia doutilizador for igual a do jogo
        if (userSeqJogo.length === seqJogo.length){
            //chama novamente a funcao proxima sequencia com 1000 milisegundos de delay
            setTimeout(function () {
                proximaSeq();
            }, 1000);
        }
    }else{
        console.log("Errado")
        // Tocar a música de sequencia errada
        playMusica("errado");
        // Adiciona a class game-over
        $("body").addClass("game-over");
        // Remover a class de game over depois de 200 milisegundos
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        // Altera o Titulo para Jogo Terminado Clica em uma tecla para Reiniciar o Jogo
        $("#level-title").text("Jogo Terminado, Prima qualquer tecla para recomeçar");
        // se estiver errado recomecar jogo
        comecar_novamente();
    }
} 

 
// Função próxima sequência
function proximaSeq() {
    // Depois de ser iniciada a sequencia do user tem de ser limpa 
    userSeqJogo = [];
    //Incrementa 1 ao numero do nivel 
    nivel++;
    // Atualiza o nivel 
    $("#level-title").text("Nível "+nivel);
    //Gera um numero randomico de 0 a 3
    var numero_random = Math.floor(Math.random() * (4));
    //Gera uma cor randomica
    var cor_random = cores_botoes[numero_random];
    //Adicionar à lista de Sequencia de Jogo
    seqJogo.push(cor_random);
    // Utilizamos JQuery para selecionar o botão com o mesmo ID da cor random escolhida
    // Depois aniamamos o mesmo
    $("#" + cor_random).fadeIn(100).fadeOut(100).fadeIn(100);
    // Tocar a música do botao clicado pelo utilizador
    playMusica(cor_random);
}   

// Recebe um input de uma cor e atribui uma nova classe durante um determinado tempo
function animarClique(cor_atual){
    //Adiciona a class pressed ao botao clicado    
    $("#" + cor_atual).addClass("pressed");
    //Altera depois de determinado tempo para a class normal
    setTimeout(function () {
        $("#" + cor_atual).removeClass("pressed");
    },100);
}

// Funcao de para tocar uma musica
function playMusica(nome){
    // Adiciona a musica a variavel
    var audio = new Audio("sons/" + nome + ".mp3");
    // toca a música
    audio.play();
}



// Funcao para comecar comecar_novamente
function comecar_novamente(){
    // reiniciar os valores para iniciar novamente o jogo
    nivel = 0;
    seqJogo = [];
    jogo = false;
}