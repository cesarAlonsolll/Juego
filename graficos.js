"use strict"
function draw(){
    camara.draw();
    requestAnimationFrame(draw);
}

class Camara{
    constructor(ctx=null, x=0, y=0){
        this.ambiente = null;
        this.objetosEnCamara = [];
        this.tamañoXReal = x;
        this.tamañoYReal = y;
        this.posX = x/2;
        this.posY = y/2;
        this.coeficienteCamara = 1;
        this.MAX_COEFICIENTE_C = 0;
        this.tamañoXVista = this.tamañoXReal/this.coeficienteCamara;
        this.tamañoYVista = this.tamañoYReal/this.coeficienteCamara;
        this.posXDer = this.posX+this.tamañoXVista/2;
        this.posXIzq = this.posX-this.tamañoXVista/2;
        this.posYDown = this.posY+this.tamañoYVista/2;
        this.posYUp = this.posY-this.tamañoYVista/2;
        this.ctx = ctx;
    }

    static get MIN_COEFICIENTE_C(){
        return 1;
    }

    set setAmbiente(ambiente){
        this.ambiente = ambiente;
    }

    definirCoordenadas(x,y){
        this.posX = x;
        this.posY = y;
        this.actualizarCamara();
    }

    moverCamara(x,y){
        this.posX += x;
        this.posY += y;
        this.actualizarCamara();
    }

    aumentarZoom(){
        if(this.coeficienteCamara<this.MAX_COEFICIENTE_C){
            this.coeficienteCamara+=((this.MAX_COEFICIENTE_C-Camara.MIN_COEFICIENTE_C)/this.MAX_COEFICIENTE_C);
            if(this.coeficienteCamara>this.MAX_COEFICIENTE_C){
                this.coeficienteCamara = this.MAX_COEFICIENTE_C;
            }
            this.posX = ambiente.personajes[0].forma.coordenadas[0];
            this.posY = ambiente.personajes[0].forma.coordenadas[1];
            this.actualizarCamara();
        }
    }

    disminuirZoom(){
        if(this.coeficienteCamara>Camara.MIN_COEFICIENTE_C){
            this.coeficienteCamara-=((this.MAX_COEFICIENTE_C-Camara.MIN_COEFICIENTE_C)/this.MAX_COEFICIENTE_C);
            if(this.coeficienteCamara<Camara.MIN_COEFICIENTE_C){
                this.coeficienteCamara = Camara.MIN_COEFICIENTE_C;
            }
            this.posX = ambiente.personajes[0].forma.coordenadas[0];
            this.posY = ambiente.personajes[0].forma.coordenadas[1];
            this.actualizarCamara();
        }
    }

    actualizarCamara(){
        this.tamañoXVista = this.tamañoXReal/this.coeficienteCamara;
        this.tamañoYVista = this.tamañoYReal/this.coeficienteCamara;
        this.posX = (this.posX-this.tamañoXVista/2)<0 ? this.tamañoXVista/2 : this.posX;
        this.posX = (this.posX+this.tamañoXVista/2)>this.tamañoXReal ? this.tamañoXReal-this.tamañoXVista/2 : this.posX;
        this.posY = (this.posY-this.tamañoYVista/2)<0 ? this.tamañoYVista/2 : this.posY;
        this.posY = (this.posY+this.tamañoYVista/2)>this.tamañoYReal ? this.tamañoYReal-this.tamañoYVista/2 : this.posY;
        this.objetosEnCamara = [];
        this.posXDer = this.posX+this.tamañoXVista/2;
        this.posXIzq = this.posX-this.tamañoXVista/2;
        this.posYDown = this.posY+this.tamañoYVista/2;
        this.posYUp = this.posY-this.tamañoYVista/2;
        this.objetosEnCamara = this.objetosEnCamara.concat(this.comprobarElementosAmbiente(
            this.ambiente.muros));
        this.objetosEnCamara = this.objetosEnCamara.concat(this.comprobarElementosAmbiente(
            this.ambiente.elementos));
        this.objetosEnCamara = this.objetosEnCamara.concat(this.comprobarElementosAmbiente(
            this.ambiente.enemigos));
        this.objetosEnCamara = this.objetosEnCamara.concat(this.comprobarElementosAmbiente(
            this.ambiente.personajes));
    }

    comprobarElementosAmbiente(conjunto = []){
        let validos = [];
        if(conjunto!=[]){
            for(let i = 0;i<conjunto.length;i++){
                if(this.comprobarElemento(conjunto[i])){
                    validos.push(conjunto[i]);
                }
            }
        }
        return validos;
    }

    comprobarElemento(objeto){
        if(objeto.forma instanceof Poligono){
            return this.comprobarPoligonos(objeto);
        }
        else if(objeto.forma instanceof Circulo){
            return  this.comprobarCirculos(objeto);
        }
    }

    comprobarPoligonos(elemento){
        for(let i = 0;i<elemento.forma.vertices.length;i++){
            let posV = elemento.forma.vertices[i].coordenadas;
            if(this.posXDer>posV[0] && this.posXIzq<posV[0] && this.posYDown>posV[1] && this.posYUp<posV[1]){
                return true;
            }
        }
        return false;
    }

    comprobarCirculos(elemento){
        //AUN ESTA CPOR ACTUALIZAR A UN ALGORITMO QUE DETECTE LA PRECENCIA DEL PERSONAJE EN PANTALLA
        return true;
    }

    draw(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        let tEnX = (this.posX/this.tamañoXVista-0.5)*this.tamañoXVista*this.coeficienteCamara;
        let tEnY = (this.posY/this.tamañoYVista-0.5)*this.tamañoYVista*this.coeficienteCamara;
        for(let i = 0;i<this.objetosEnCamara.length;i++){
            let objeto = this.objetosEnCamara[i];
            this.ctx.fillStyle = objeto.style;
            this.ctx.strokeStyle = objeto.style;
            if(objeto.forma instanceof Poligono){
                this.dibujaPoligono(objeto, tEnX, tEnY);
            }
            else{
                this.dibujaCirculo(objeto, tEnX, tEnY);
            }
        }
    }

    dibujaPoligono(objeto, tEnX, tEnY){
        this.ctx.beginPath();
        let array = objeto.forma.vertices[0].coordenadas;
        this.ctx.moveTo(objeto.forma.vertices[0].coordenadas[0]*this.coeficienteCamara-tEnX,
            objeto.forma.vertices[0].coordenadas[1]*this.coeficienteCamara-tEnY);
        for(let j = 0;j<objeto.forma.vertices.length;j++){
            let coordenadas = objeto.forma.vertices[(j+1)%4].coordenadas;
            this.ctx.lineTo(coordenadas[0]*this.coeficienteCamara-tEnX,
                coordenadas[1]*this.coeficienteCamara-tEnY);
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }

    dibujaCirculo(objeto, tEnX, tEnY){
        let coordenadas = objeto.forma.coordenadas;
        let radio = objeto.forma.radio;
        this.ctx.beginPath();
        this.ctx.arc(coordenadas[0]*this.coeficienteCamara-tEnX,
            coordenadas[1]*this.coeficienteCamara-tEnY,radio*this.coeficienteCamara,0,2*Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }
}

class Ambiente{
    constructor(array){
        this.muros = array;
        this.elementos = [];
        this.enemigos = [];
        this.personajes = [];
    }

    set addPersonaje(personaje){
        this.personajes.push(personaje);
    }

    set addEnemigo(enemigo){
        this.enemigos.push(enemigo);
    }

    set addElemento(elemento){
        this.elementos.push(elemnto);
    }

    deletePersonaje(personaje){
        let index = this.personajes.indexOf(personaje);
        if(index!=-1){
            this.personajes.splice(index,1);
        }
    }

    deleteEnemigo(enemigo){
        let index = this.enemigos.indexOf(enemigo);
        if(index!=-1){
            this.enemigos.splice(index,1);
        }
    }

    deleteElemento(elemnto){
        index = this.elementos.indexOf(elemnto);
        if(index!=-1){
            this.elementos.splice(index,1);
        }
    }
}