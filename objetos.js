"use strict"
class Objeto{
    constructor(forma, style){
        this.forma = forma;
        this.style = style;
    }

    set setStyle(style){
        this.style = style;
    }
}

class ObjetoMovil extends Objeto{
    constructor(forma, style, velMax=0){
        super(forma, style);
        this.velX = 0;
        this.velY = 0;
        this.velMax = velMax;
    }

    setVelocidades(x=0,y=0){
        this.velX = x;
        this.velY = y;
    }

    actualizarPos(){
        this.forma.actualizarPos(this.velX, this.velY);
    }
}