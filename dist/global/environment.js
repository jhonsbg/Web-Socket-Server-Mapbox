"use strict";
// Constantes o variables globales
Object.defineProperty(exports, "__esModule", { value: true });
//Definición del puerto - process.env.PORT lee el puerto si lo conectamos ej Heroku
var SERVER_PORT = Number(process.env.PORT) || 5000;
exports.default = SERVER_PORT;
