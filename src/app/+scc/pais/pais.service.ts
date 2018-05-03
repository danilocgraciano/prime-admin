import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PaisService {

  url: string = '/api/pais';

  constructor(private http: HttpClient) { }

  private getUrl(id) {
    return this.url + "/" + id;
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
