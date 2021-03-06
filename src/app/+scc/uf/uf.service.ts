import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UfService {

  url: string = '/api/uf';

  constructor(private http: HttpClient) { }

  private getUrl(id) {
    return this.url + "/" + id;
  }

  search(sigla = '', descricao = '', codigoIbge = '') {
    return this.http.get(this.url + "/search", {
      params: {
        'sigla': sigla,
        'descricao': descricao,
        'codigoIbge': codigoIbge,
      }
    });
  }

  readById(id: number) {
    return this.http.get(this.getUrl(id));
  }

  create(obj) {

    return this.http.post(this.url, JSON.stringify(obj),
      { headers: { 'Content-Type': 'application/json' } });

  }

  update(obj) {
    return this.http.put(this.getUrl(obj.id), JSON.stringify(obj),
      { headers: { 'Content-Type': 'application/json' } });
  }

  deleteById(id: number) {
    return this.http.delete(this.getUrl(id));
  }
}
