"use strict"
class SeccionLaberinto{

    constructor(){
        this.muros = [];
        for(let i=0;i<4;i++){
            this.muros[i] ={
                nombre : "",
                hayMuro : true
            }
        }
        this.muros[0].nombre = "top";
        this.muros[1].nombre = "right";
        this.muros[2].nombre = "down";
        this.muros[3].nombre = "left";
    }

    set estadoMuro(muro){
        switch(muro){
            case "top":
                this.muros[0].hayMuro = false;
                break;
            case "right":
                this.muros[1].hayMuro = false;
                break;
            case "down":
                this.muros[2].hayMuro = false;
                break;
            case "left":
                this.muros[3].hayMuro = false;
                break;
        }
    }
}

class EstadoSeccion{
    constructor() {
        this.colVisitadores = [];
        this.visitado = false;
    }

    set visitado(visitador){
        this.visitado = true;
        this.colVisitadores.push(visitador);
    }

    set nuevoVisitador(visitador){
        this.colVisitadores.push(visitador);
    }
}

class ElementoLaberinto{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.seccion = new SeccionLaberinto();
        this.estadoSeccion = new EstadoSeccion();
    }
}