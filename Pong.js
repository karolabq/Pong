//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//tamanho canva
let larguracanva = 600;
let alturacanva = 400;

//variáveis da raquete
let xRaquete = 2;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 100;
let xRaquete2 = larguracanva - raqueteComprimento - 2;
let yRaquete2 = 150;

//velocidade da raquete
let velocidadeYRaquete = 9;
let velocidadeYRaquete2 = 3;

// pontuação
let pontoJogador1 = 0;
let pontoJogador2 = 0;

// sons jogo
let raquetada;
let ponto;
let trilha;

function preload (){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete();
  movimentaRaquete();
  verificaColisaoRaquete();
  pontuacao();
  movimentaRaquete2();
 }

function mostraBolinha (){
  circle (xBolinha,yBolinha,diametro) 
}

function movimentaBolinha (){
  xBolinha += velocidadeXBolinha; 
  yBolinha += velocidadeYBolinha; 
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
    if (xBolinha + raio > width){
      pontoJogador1 += 1;
    }
    if (xBolinha - raio < 0) {
      pontoJogador2 += 1;
    }
    ponto.play();
  }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
  if (yRaquete <= 0){
    yRaquete = 0;
  }
  if (yRaquete >= 300){
    yRaquete = 300;
  }
  if (yRaquete2 <= 0){
    yRaquete2 = 0;
  }
  if (yRaquete2 >= 300){
    yRaquete2 = 300;
  }
}

function mostraRaquete(){
   rect (xRaquete,yRaquete,raqueteComprimento,raqueteAltura)
  rect (xRaquete2,yRaquete2,raqueteComprimento,raqueteAltura)
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= velocidadeYRaquete;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += velocidadeYRaquete;
  }
}

/*function movimentaRaquete2(){
  if (keyIsDown(87)) {
    yRaquete2 -= velocidadeYRaquete2;
  }
  if (keyIsDown(83)) {
    yRaquete2 += velocidadeYRaquete2;
  }
}*/

function movimentaRaquete2(){
  if (yBolinha < yRaquete2) {
    yRaquete2 -= velocidadeYRaquete2;
  }
  if (yBolinha > yRaquete2 + raqueteAltura) {
    yRaquete2 += velocidadeYRaquete2;}
}

function verificaColisaoRaquete (){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
  if (xBolinha + raio > xRaquete2 && yBolinha < yRaquete2 + raqueteAltura && yBolinha > yRaquete2){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function pontuacao (){
  stroke (255)
  textAlign(CENTER);
  textSize (30);
  fill(255,153,204);
  rect(240, 5, 70, 30);
  fill (255,255,255);
  text (pontoJogador1 + "X" + pontoJogador2, 275, 30);
}