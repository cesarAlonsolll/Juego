"use strict"
function toHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(10);
	}
	return hex;
}

document.getElementById("generar").onclick = function (){
    if(document.getElementById("semillaID").value!=""){
        semilla = new Semilla(toHex(document.getElementById("semillaID").value));
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
};