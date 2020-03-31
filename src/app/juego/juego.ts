import { Compania } from '../compania/compania';

export class Juego {
    idJuego: number;
    categoria: string;
    titulo:string;
    fecLanzamiento:string;
    pegi:number;
    companias:Compania[];
}
