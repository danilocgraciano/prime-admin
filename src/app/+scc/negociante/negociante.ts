import { Telefone } from "./telefone";
import { Endereco } from "./endereco";

export class Negociante {

    id: number;
    codigo: string;
    nome: string;
    tipoNegociante: number;
    cpfCnpj: string;
    inscricaoEstadual: string;
    rg: string;
    suframa: string;
    contribuinteIcms: boolean;
    caixaPostal: string;
    email: string;
    homePage: string;
    observacao: string;
    tipoRegimeTributacao: number;
    nomeFantasia: string;
    inativo: boolean;
    sexo: string;
    dataNascimento: Date;
    telefones: Array<Telefone> = new Array<Telefone>();
    enderecos: Array<Endereco> = new Array<Endereco>();

    constructor() {

    }
}