"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuarios = exports.configurarUsuario = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.mapaSockets = exports.mapa = exports.usuariosConectados = void 0;
var usuarios_lista_1 = require("../classes/usuarios-lista");
var usuario_1 = require("../classes/usuario");
var mapa_1 = require("../classes/mapa");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
exports.mapa = new mapa_1.Mapa();
// Eventos de mapa
var mapaSockets = function (cliente, io) {
    cliente.on('marcador-nuevo', function (marcador) {
        exports.mapa.agregarMarcador(marcador);
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });
    cliente.on('marcador-borrar', function (id) {
        exports.mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar', id);
    });
    cliente.on('marcador-mover', function (marcador) {
        exports.mapa.moverMarcador(marcador);
        // console.log(marcador);
        cliente.broadcast.emit('marcador-mover', marcador);
    });
};
exports.mapaSockets = mapaSockets;
// Agregar cliente a lista de usuarios
var conectarCliente = function (cliente, io) {
    console.log("Creando usuario");
    var usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
    cliente.emit('id-usuario', cliente.id);
    // console.log(cliente.id);
};
exports.conectarCliente = conectarCliente;
// Escuchar si cliente se desconecta
var desconectar = function (cliente, io) {
    cliente.on('disconnect', function () {
        console.log('Borrar Marcador');
        exports.mapa.borrarMarcador(cliente.id);
        cliente.broadcast.emit('marcador-borrar', cliente.id);
        console.log('Ciente desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.desconectar = desconectar;
// Escuchar mensajes
var mensaje = function (cliente, io) {
    cliente.on('mensaje', function (payload) {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
exports.mensaje = mensaje;
// Configurar Usuario
var configurarUsuario = function (cliente, io) {
    cliente.on('configurar-usuario', function (payload, callback) {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: "Usuario " + payload.nombre + ", configurado"
        });
    });
};
exports.configurarUsuario = configurarUsuario;
// Obtener usuarios
var obtenerUsuarios = function (cliente, io) {
    cliente.on('obtener-usuarios', function () {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.obtenerUsuarios = obtenerUsuarios;
