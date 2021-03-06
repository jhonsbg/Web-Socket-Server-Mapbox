import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";
import { Mapa } from "../classes/mapa";
import { Marcador } from '../classes/marcador';

export const usuariosConectados = new UsuariosLista();
export const mapa = new Mapa();


// Eventos de mapa
export const mapaSockets = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('marcador-nuevo', (marcador: Marcador) => {
        mapa.agregarMarcador(marcador);

        cliente.broadcast.emit('marcador-nuevo', marcador);
    });

    cliente.on('marcador-borrar', (id: string) => {
        mapa.borrarMarcador(id);

        cliente.broadcast.emit('marcador-borrar', id);
    });

    cliente.on( 'marcador-mover', ( marcador: Marcador ) => {
        mapa.moverMarcador( marcador );
        // console.log(marcador);
        cliente.broadcast.emit( 'marcador-mover', marcador );
    });
}




// Agregar cliente a lista de usuarios
export const conectarCliente = (cliente: Socket, io:socketIO.Server) => {
    console.log("Creando usuario");
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
    cliente.emit('id-usuario', cliente.id);
    // console.log(cliente.id);
}

// Escuchar si cliente se desconecta
export const desconectar = (cliente: Socket, io:socketIO.Server) => {
    cliente.on('disconnect', () => {
        console.log('Borrar Marcador');
        mapa.borrarMarcador(cliente.id);
        cliente.broadcast.emit('marcador-borrar', cliente.id);
        console.log('Ciente desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
}

// Configurar Usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        io.emit('usuarios-activos', usuariosConectados.getLista());

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
}

// Obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}