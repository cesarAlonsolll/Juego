"use strict"
let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");
let camara = new Camara(ctx, ctx.canvas.width, ctx.canvas.height);
let semilla = null;
let mapaBase = null;
let ambiente = new Ambiente();
console.log(ambiente);