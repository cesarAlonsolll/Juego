"use strict"
function generarMuros(d1, d2, tipo){
    let filas = [];
    for(let i = 0;i<d1;i++){
        let columnas = [];
        for(let j = 0;j<d2;j++){
            columnas.push(tipo);
        }
        filas.push(columnas);
    }
    return filas;
}
class mapaBase{
    constructor(dimension){
        this.murosH =  generarMuros(dimension-1, dimension, true);
        console.log(this.murosH);
        this.murosV = generarMuros(dimension, dimension-1, true);
        console.log(this.murosH);
        this.secciones = generarMuros(dimension, dimension, 0);
        console.log(this.secciones);
    }
}

class Visitador{
    constructor(codigo=0, x=0, y=0, mapa=[], semilla=Math){
        this.recorridos = [];
        this.codigo = codigo;
        this.posX = x;
        this.posY = y;
        this.mapa = mapa;
        this.semilla = semilla;
    }

    siguiente(){
        let posiblesCaminos = comprobarProximos();
    }

    comprobarProximos(){
        let posiblesCaminos = [];
        let auxPos = [-1,0];
        for(let i = 4;i < 4;i++){
            let valor = mapa[this.posY+auxPos[0]][this.posX+auxPos[1]].estadoSeccion.visitador;
            if(valor!=this.codigo && valor!=undefined){
                posiblesCaminos.push(auxPos);
            }
            auxPos = [auxPos[1],-auxPos[0]]
        }
        return posiblesCaminos;
    }
}