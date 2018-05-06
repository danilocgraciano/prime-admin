import { Municipio } from "../municipio/municipio";

export class Cep {

    id: number;
    codigo: string;
    logradouro: string;
    bairro: string;
    municipio: Municipio = new Municipio();

}