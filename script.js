// Repetição utilizando quadros por segundo
window.onload = function(){
    variaveis();
    setInterval(game, 1000 / 300);
}
function variaveis(){
 bolaX = bolaY = 150;
 diametroBola = 10;
 velocidadeBolaX = velocidadeBolaY = constanteVelocidadeBola = 2;

 posicaoPlayer1 = posicaoPlayer2 = 80;
 pontosPlayer1 = pontosPlayer2 = 0;
 velocidadePlayer2 = 3;

 espessuraRede = 5;
 alturaRaquete = 100;
 larguraRaquete = 8;
 efeitoRaquete = 0.2;
 
 limiteFase = 10;
 faseAtual = 1;
 pontosPorFase = 5;

 // Definições da folha de desenho
 folhaDesenho = document.getElementById("folha");
 folhaDesenho.height = 8git00;
 folhaDesenho.width  = 1200;
 areaDesenho = folhaDesenho.getContext('2d');


 // Definições do campo
 alturaCampo = folhaDesenho.height;
 larguraCampo = folhaDesenho.width;


// Movimento do PLayer1 com o mouse
folhaDesenho.addEventListener('mousemove', function(e){
posicaoPlayer1 = e.clientY - alturaRaquete / 2
});
}
function game(){
    desenho();
    calcular();
}
function desenho(){
    //Area do campo
	areaDesenho.fillStyle = '#286047';
	areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);
					
	//Area da linha central
	areaDesenho.fillStyle = '#FFFFFF';
	areaDesenho.fillRect(larguraCampo / 2 - espessuraRede / 2, 0, espessuraRede, alturaCampo);

	//Area das raquetes
	areaDesenho.fillRect(0, posicaoPlayer1, larguraRaquete, alturaRaquete);
	areaDesenho.fillRect(larguraCampo - larguraRaquete, posicaoPlayer2, larguraRaquete, alturaRaquete);

    //Area da bolinha
    areaDesenho.fillRect(bolaX - diametroBola / 2, bolaY - diametroBola / 2, diametroBola, diametroBola);

    // Pontuação na tela
    //areaDesenho.font("20px Arial");
    areaDesenho.fillText("Humano: " + pontosPlayer1 + " pontos", 100, 100);
    areaDesenho.fillText("Computador: " + pontosPlayer2 + " pontos", larguraCampo - 100, 100);
}
function reiniciar(){
    bolaX = larguraCampo / 2;
    bolaY = alturaRaquete / 2;
    velocidadeBolaX = -velocidadeBolaX;
    velocidadeBolaY = constanteVelocidadeBola;
}
function calcular(){
    bolaX += velocidadeBolaX;
    bolaY += velocidadeBolaY;

    // Incremento das rebatidas laterais
    if(bolaY < 0 && velocidadeBolaY < 0){
        velocidadeBolaY = -velocidadeBolaY;
    }
    if(bolaY > alturaCampo && velocidadeBolaY > 0){
        velocidadeBolaY = -velocidadeBolaY;
    }

    // Verifica pontuação e rabatida das raquetes
    if(bolaX < 0){
        if(bolaY > posicaoPlayer1 && bolaY < posicaoPlayer1 + alturaRaquete){
            velocidadeBolaX = -velocidadeBolaX;
            diferencaY = bolaY - (posicaoPlayer1 + alturaRaquete / 2);
            velocidadeBolaY = diferencaY * efeitoRaquete;
        }else{
            pontosPlayer2++;
          //  if ((potuacaoJogador2 > 0) && (potuacaoJogador2%pontosPorFase == 0)) {
          //      incrementarFase();
          //  }
            reiniciar();
        }
    }
    if(bolaX > larguraCampo){
        if(bolaY > posicaoPlayer2 && bolaY < posicaoPlayer2 + alturaRaquete){
            velocidadeBolaX = -velocidadeBolaX;
            diferencaY = bolaY - (posicaoPlayer2 + alturaRaquete / 2);
            velocidadeBolaY = diferencaY * efeitoRaquete;
        }else{
            pontosPlayer1++;
           // if ((potuacaoJogador1 > 0) && (potuacaoJogador1%pontosPorFase == 0)) {
          //      incrementarFase();
           // }
            reiniciar();
        }
    }

    //Movimento do computador buscando a movimentação da bolinha
    if(posicaoPlayer2 + alturaRaquete / 2 < bolaY){
        posicaoPlayer2 += velocidadePlayer2;
    } else{
        posicaoPlayer2 -= velocidadePlayer2;
    }
}
/*
function incrementarFase() {
    faseAtual++;
  
    if(faseAtual >= limiteFase) {
      console.log('======================');
      console.log('Limite de Fase');
      console.log('======================');
    } else {
      console.log('======================');
      console.log('Fase ' + faseAtual);
      console.log('======================');
  
      console.log('constanteVelocidadeBola: ' + constanteVelocidadeBola);
      console.log('efeitoRaquete: ' + efeitoRaquete);
      console.log('velocidadeJogador2: ' + velocidadeJogador2);
  
      console.log('---------------------');
  
      constanteVelocidadeBola *= 1.2;
      efeitoRaquete *= 1.05;
      velocidadeJogador2 *= 1.15;
  
      console.log('constanteVelocidadeBola: ' + constanteVelocidadeBola);
      console.log('efeitoRaquete: ' + efeitoRaquete);
      console.log('velocidadeJogador2: ' + velocidadeJogador2);  
    } 
  }*/