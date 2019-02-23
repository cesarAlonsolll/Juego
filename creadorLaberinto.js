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
        this.dimension = dimension;
        this.murosH =  generarMatriz(dimension-1, dimension, true);
        this.murosV = generarMatriz(dimension, dimension-1, true);
        this.secciones = generarMatriz(dimension, dimension, 0);
    }
}

class transformadorMuros{
    constructor(mapaBase=null, width=0, height=0){
        this.mapaBase = mapaBase;
        this.seccionMinX = width/this.mapaBase.dimension;
        this.seccionMinY = height/this.mapaBase.dimension;
    }

    get getObjetosMuros(){
        let listaObjetos = [];
        listaObjetos = listaObjetos.concat(this.comprobarMuros(this.mapaBase.murosH, this.seccionMinX, this.seccionMinY));
        listaObjetos = listaObjetos.concat(this.comprobarMuros(this.mapaBase.murosV, this.seccionMinX, this.seccionMinY));
        return listaObjetos;
    }

    comprobarMuros(muros=[], dx=0, dy=0){
        let aux = muros.length<muros[0].length ? [0,1,0] : [1,0,1];
        let auxArray = [];
        let du = muros.length<muros[0].length ? [dx,1] : [1,dy];
        for(let i = 0;i<muros.length;i++){
            for(let j = 0;j<muros[0].length;j++){
                if(muros[i][j]){
                    auxArray.push(this.generarObjetoConPoligono([(j+aux[0])*dx,(i+aux[1])*dy],du,aux[2]));
                }
            }
        }
        return auxArray;
    }

    generarObjetoConPoligono(coordenadas, du, resta){
        let auxCoordenadas = resta==0 ? [coordenadas[0],coordenadas[1]-0.5] : [coordenadas[0]-0.5,coordenadas[1]];
        let poligono = new Poligono();
        let vertices = [];
        let aristas = [];
        let direccion = [1,0];
        for(let i = 0;i<4;i++){
            vertices.push(new Vertice(("v"+(i+1)),auxCoordenadas));
            auxCoordenadas = [auxCoordenadas[0]+(du[0]*direccion[0]),auxCoordenadas[1]+(du[1]*direccion[1])];
            direccion = [direccion[1]*-1,direccion[0]];
        }
        poligono.setVertices = vertices;
        for(let i = 0;i<4;i++){
            aristas.push(new Arista(("a"+(i+1)),[vertices[i],vertices[(i+1)%4]]));
        }
        poligono.setAristas = aristas;
        return (new Objeto(poligono, "green"));
    }
}

class Circulo{

    set setRadio(radio){
        this.radio = radio;
    }

    set setCoordenadas(coordenadas){
        this.coordenadas = coordenadas;
    }

    actualizarPos(velX, velY){
        this.coordenadas[0] += velX;
        this.coordenadas[1] += velY;
    }
}

class Poligono{

    set setVertices(vertices){
        this.vertices = vertices;
    }

    set setAristas(aristas){
        this.aristas = aristas;
    }

    actualizarPos(velX, velY){
        for(let i = 0; i<this.vertices.length;i++){
            this.vertices[i][0]+=velX;
            this.vertices[i][1]+=velY;
        }
    }
}

function Vertice(id="", coordenadas=[]){
    this.id = id;
    this.coordenadas = coordenadas;
}

function Arista(id="", vertices=[]){
    this.id = id;
    this.verticesContiguos = vertices;
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

    siguiente(){
        this.mapa.secciones[this.posY][this.posX] = this.codigo;
        let posiblesCaminos = this.comprobarProximos();
        if(posiblesCaminos.length==0){
            if(this.recorridos.length!=0){
                let aux = this.recorridos.pop();
                this.posY = aux[0];
                this.posX = aux[1];
                this.siguiente();
            }
        }
        else{
            this.recorridos.push([this.posY, this.posX]);
            let camino = Math.floor(this.semilla.random()*posiblesCaminos.length);
            this.modificarMuro([this.posY,this.posX],posiblesCaminos[camino]);
            this.posY += posiblesCaminos[camino][0];
            this.posX += posiblesCaminos[camino][1];
            this.siguiente();
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