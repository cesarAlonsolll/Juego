"use strict"
class Camara{
    constructor(ctx=null, x=0, y=0){
        this.ambiente = null;
        this.tamañoXReal = x;
        this.tamañoYReal = y;
        this.posX = x/2;
        this.posY = y/2;
        this.coeficienteCamara = 1;
        this.ctx = ctx;
    }

    static get MAX_COEFICIENTE_C(){
        return 20;
    }

    static get MIN_COEFICIENTE_C(){
        return 1;
    }

    set setAmbiente(ambiente){
        this.ambiente = ambiente;
    }
}

class ObjetoDibujable{

}

class Ambiente{
    constructor(array){
        this.objetos = {
            muros: array,
            elementos: [],
            personajes: []
        };
    }

    set addPersonaje(personaje){
        this.objetos.personajes.push(personaje);
    }

    set addElemnto(elemnto){
        this.objetos.elementos.push(elemnto);
    }

    deletePersonaje(personaje){
        let index = this.objetos.personajes.indexOf(personaje);
        if(index!=-1){
            this.objetos.personajes.splice(index,1);
        }
    }

    deleteElemento(elemnto){
        index = this.objetos.elementos.indexOf(elemnto);
        if(index!=-1){
            this.objetos.elementos.splice(index,1);
        }
    }
}