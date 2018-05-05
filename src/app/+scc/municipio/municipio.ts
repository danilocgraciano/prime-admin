import { UF } from "../uf/uf";
import { Pais } from "../pais/pais";

export class Municipio {

    id: number;
    nome: string;
    codigoMunicipal: string;
    uf: UF = new UF();
    pais: Pais = new Pais();

}