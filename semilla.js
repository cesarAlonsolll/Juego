"use strict"
class Semilla{
    constructor(semilla=(Math.random()*630360016)){
        this.semilla = semilla;
    }

    random(){
        this.semilla = (this.semilla*630360016)%(2**31-1);
        return this.semilla/(2**31-1);
    }
}