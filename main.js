"use strict"
let mapa = new mapaBase(10);
let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");
let camara = new Camara(ctx, ctx.canvas.width, ctx.canvas.height);
camara.setAmbiente = mapa;//PROBANDO EL DIBUJO DEL MAPA