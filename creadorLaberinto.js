"use strict"
function generarMatriz(d1, d2, tipo){
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

class MapaBase{
    constructor(dimension){
        this.murosH =  generarMatriz(dimension-1, dimension, true);
        this.murosV = generarMatriz(dimension, dimension-1, true);
        this.secciones = generarMatriz(dimension, dimension, 0);
    }
}

class Visitador{
    constructor(codigo=0, x=0, y=0, mapa=null, semillaG=Math){
        this.recorridos = [];
        this.codigo = codigo;
        this.posX = x;
        this.posY = y;
        this.mapa = mapa;
        this.semilla = semillaG;
    }

    comenzarRecorrido(){
        try {
            if(this.mapa==null){
                alert("no se genero mapa.")
            }
            this.siguiente(1);
            return this.mapa;
        } catch (error) {
            alert(error);
        }
    }

    siguiente(num){
        this.mapa.secciones[this.posY][this.posX] = this.codigo;
        let posiblesCaminos = this.comprobarProximos();
        if(posiblesCaminos.length==0){
            if(this.recorridos.length!=0){
                let aux = this.recorridos.pop();
                this.posY = aux[0];
                this.posX = aux[1];
                this.siguiente(num);
            }
        }
        else{
            this.recorridos.push([this.posY, this.posX]);
            let camino = Math.floor(this.semilla.random()*posiblesCaminos.length);
            this.modificarMuro([this.posY,this.posX],posiblesCaminos[camino]);
            this.posY += posiblesCaminos[camino][0];
            this.posX += posiblesCaminos[camino][1];
            this.siguiente(num+1);
        }
    }

    modificarMuro(posActual, movimiento){
        let aux = [0,0];
        if(movimiento[1]==-1 || movimiento[0]==-1){
            aux = movimiento;
        }
        if(movimiento[0]==0){
            this.mapa.murosV[posActual[0]+aux[0]][posActual[1]+aux[1]] = false;
        }
        else{
            this.mapa.murosH[posActual[0]+aux[0]][posActual[1]+aux[1]] = false;
        }
    }

    comprobarProximos(){
        let posiblesCaminos = [];
        let auxPos = [-1,0];
        for(let i = 0;i < 4;i++){
            if(this.mapa.secciones[this.posY+auxPos[0]]!=undefined){
                let valor = this.mapa.secciones[this.posY+auxPos[0]][this.posX+auxPos[1]];
                if(valor!=this.codigo && valor!=undefined){
                    posiblesCaminos.push(auxPos);
                }
            }
            auxPos = [auxPos[1],auxPos[0]*-1];
        }
        return posiblesCaminos;
    }
}