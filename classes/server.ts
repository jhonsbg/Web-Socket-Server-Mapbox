import express from 'express';
import SERVER_PORT from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as sockets from '../sockets/sockets';


export default class Server{
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io:socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        // Se configura el CORS
        this.io = require ('socket.io') (this.httpServer, {
            cors:{
                origin: true,
                credentials: true
            }
        });

        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    private escucharSockets() {
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {
            console.log("Holaa");
            // Conectar cliente
            sockets.conectarCliente(cliente, this.io);

            // Configurar usuario
            sockets.mapaSockets(cliente, this.io);

            // Configurar Usuario
            sockets.configurarUsuario(cliente, this.io);

            // Obtener usuarios activos
            sockets.obtenerUsuarios(cliente, this.io);

            // Mensaje
            sockets.mensaje(cliente, this.io);

            // Desconectar
            sockets.desconectar(cliente, this.io);
        })
    }

    start(callback: VoidFunction){
        this.httpServer.listen(this.port, callback);
    }
}