"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapa = void 0;
var Mapa = /** @class */ (function () {
    function Mapa() {
        this.marcadores = {};
    }
    Mapa.prototype.getMarcadores = function () {
        return this.marcadores;
    };
    Mapa.prototype.agregarMarcador = function (marcador) {
        this.marcadores[marcador.id] = marcador;
    };
    Mapa.prototype.borrarMarcador = function (id) {
        delete this.marcadores[id];
        return this.getMarcadores();
    };
    Mapa.prototype.moverMarcador = function (marcador) {
        this.marcadores[marcador.id].lng = marcador.lng;
        this.marcadores[marcador.id].lat = marcador.lat;
    };
    return Mapa;
}());
exports.Mapa = Mapa;
