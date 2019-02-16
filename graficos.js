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
    constructor(muros){

    }
}