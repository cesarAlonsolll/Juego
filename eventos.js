"use strict"
function toDec(str) {
	let dec = '';
	for(let i=0;i<str.length;i++) {
		dec += ''+str.charCodeAt(i).toString(10);
    }
	return dec;
}

document.getElementById("generar").onclick = function (){
    if(document.getElementById("semillaID").value!=""){
        semilla = new Semilla(toDec(document.getElementById("semillaID").value));
    }
    else{
        semilla = new Semilla();
    }
    let dimension = null;
    if(document.getElementById("tamañoMapa").value!=""){
        dimension = parseInt(document.getElementById("tamañoMapa").value);
    }
    else{
        dimension = (Math.floor(Math.random()*5)+1)*5;
    }
    mapaBase = new MapaBase(dimension);
    (new Visitador(1, Math.floor(semilla.random()*dimension), Math.floor(semilla.random()*dimension), mapaBase, semilla)).comenzarRecorrido();
    ambiente = new Ambiente((new transformadorMuros(mapaBase, ctx.canvas.width, ctx.canvas.height)).getObjetosMuros);
    let circulo = new Circulo();
    if(ctx.canvas.width>ctx.canvas.height){
        circulo.setRadio = ctx.canvas.width/dimension/4;
    }
    else{
        circulo.setRadio = ctx.canvas.height/dimension/4;
    }
    circulo.setCoordenadas = [ctx.canvas.width/2,ctx.canvas.height/2];
    ambiente.addPersonaje = new ObjetoMovil(circulo, "red");
    camara.setAmbiente = ambiente;
    camara.MAX_COEFICIENTE_C = dimension;
    camara.coeficienteCamara = 1;
    camara.actualizarCamara();
};

window.addEventListener("keydown",function(evt){
    let movCamara = [0,0];
    let movPersonaje = [0,0];
    let movJugador = false;
    switch(evt.code){
        case "KeyL":
            movCamara = [1,0];
            break;
        case "KeyJ":
            movCamara = [-1,0];
            break;
        case "KeyI":
            movCamara = [0,-1];
            break;
        case "KeyK":
            movCamara = [0,1];
            break;
        case "ArrowRight":
            movJugador = true;
            movPersonaje = [1,0];
            break;
        case "ArrowLeft":
            movJugador = true;
            movPersonaje = [-1,0];
            break;
        case "ArrowUp":
            movJugador = true;
            movPersonaje = [0,-1];
            break;
        case "ArrowDown":
            movJugador = true;
            movPersonaje = [0,1];
            break;
        case "KeyQ":
            camara.aumentarZoom();
            break;
        case "KeyE":
            camara.disminuirZoom();
            break;
    }
    if(camara.ambiente!=null){
        if(!movJugador){
            camara.moverCamara(movCamara[0]/camara.coeficienteCamara*10,movCamara[1]/camara.coeficienteCamara*10);
        }
        else{
            camara.ambiente.personajes[0].setVelocidades(movPersonaje[0]*((ctx.canvas.width/camara.MAX_COEFICIENTE_C)*0.05),
                movPersonaje[1]*((ctx.canvas.height/camara.MAX_COEFICIENTE_C)*0.05));
            camara.ambiente.personajes[0].actualizarPos();
            camara.definirCoordenadas(camara.ambiente.personajes[0].forma.coordenadas[0],
                camara.ambiente.personajes[0].forma.coordenadas[1]);
        }
    }
})

window.addEventListener("keyup",function(evt){
    let movPersonaje = [];
    switch(evt.code){
        case "ArrowRight":
            movPersonaje = [0,0];
            break;
        case "ArrowLeft":
            movPersonaje = [0,0];
            break;
        case "ArrowUp":
            movPersonaje = [0,0];
            break;
        case "ArrowDown":
            movPersonaje = [0,0];
            break;
    }
    if(camara.ambiente!=null && movPersonaje!=[]){
        camara.ambiente.personajes[0].setVelocidades(movPersonaje[0], movPersonaje[1]);
    }
})