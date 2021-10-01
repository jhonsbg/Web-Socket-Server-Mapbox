import { Marcador } from './marcador';


export class Mapa{
    private marcadores: {[key: string]: Marcador} = {
        
    }

    constructor(){}

    getMarcadores(){
        return this.marcadores;
    }

    agregarMarcador(marcador: Marcador){
        this.marcadores[marcador.id] = marcador;
    }

    borrarMarcador(id: string){
        delete this.marcadores[id];
        return this.getMarcadores();
    }

    moverMarcador(marcador: Marcador){
        this.marcadores[marcador.id].lng = marcador.lng;
        this.marcadores[marcador.id].lat = marcador.lat;
    }
}