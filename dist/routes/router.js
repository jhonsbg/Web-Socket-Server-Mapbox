"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var server_1 = __importDefault(require("../classes/server"));
var sockets_1 = require("../sockets/sockets");
var router = (0, express_1.Router)();
// Mapa
router.get('/mapa', function (req, res) {
    res.json(sockets_1.mapa.getMarcadores());
});
// Chat
router.get('/mensajes', function (req, res) {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });
});
router.post('/mensajes', function (req, res) {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    var payload = {
        cuerpo: cuerpo,
        de: de
    };
    var serve = server_1.default.instance;
    serve.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de
    });
});
router.post('/mensajes/:id', function (req, res) {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    var id = req.params.id;
    var payload = {
        de: de,
        cuerpo: cuerpo
    };
    var server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de,
        id: id
    });
});
// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios/', function (req, res) {
    var server = server_1.default.instance;
    server.io.allSockets().then(function (clientes) {
        res.json({
            ok: true,
            // clientes
            clientes: Array.from(clientes)
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
});
//Obtener usuarios y sus nombres
router.get('/usuarios/detalle', function (req, res) {
    res.json({
        ok: true,
        clientes: sockets_1.usuariosConectados.getLista()
    });
});
exports.default = router;
