export class Usuario {
    public id: string;
    public idMarcador: string;
    public nombre: string;
    public sala: string;

    constructor(id: string){
        this.id = id;
        this.idMarcador = 'sin-marcador';
        this.nombre = 'sin-nombre';
        this.sala = 'sala-defecto';
    }
}