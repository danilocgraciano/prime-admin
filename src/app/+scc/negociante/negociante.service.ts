import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NegocianteService {

  url: string = '/api/negociante';

  constructor(private http: HttpClient) { }

  private getUrl(id) {
    return this.url + "/" + id;
  }

  readById(id: number) {
    return this.http.get(this.getUrl(id)).map((data) => {
      let negociante = data["data"];
      negociante["dataNascimento"] = new Date(negociante["dataNascimento"] + 'T00:00:00');
      data["data"] = negociante;
      return data;
    });
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
