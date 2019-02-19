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
        dimension = (Math.floor(Math.random()*3)+1)*5;
    }
    mapaBase = new MapaBase(dimension);
    (new Visitador(1, Math.floor(semilla.random()*dimension), Math.floor(semilla.random()*dimension), mapaBase, semilla)).comenzarRecorrido();
    ambiente = new Ambiente((new transformadorMuros(mapaBase, ctx.canvas.width, ctx.canvas.height)).getObjetosMuros);
    camara.setAmbiente = ambiente;
    camara.actualizarCamara();
    camara.draw();
};