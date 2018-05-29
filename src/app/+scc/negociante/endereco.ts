import { Cep } from "../cep/cep";
import { Municipio } from "../municipio/municipio";

export class Endereco {

    id: number;
    endereco: string = '';
    numero: string = '';
    complemento: string = '';
    bairro: string = '';
    tipoEndereco: number = 0;
    cep: Cep = new Cep();
    municipio: Municipio = new Municipio();

}