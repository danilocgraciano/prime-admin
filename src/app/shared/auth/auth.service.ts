import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/do';

import * as moment from "moment";
import { Usuario } from '../usuario/usuario';

@Injectable()
export class AuthService {

  redirectUrl: string = '';
  keyToken: string = 'tokenPrimeAdmin';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  login(usuario: Usuario) {

    this.route.queryParams.subscribe(params => this.redirectUrl = params['return'] || '');

    return this.http.post('/api/login', JSON.stringify(usuario),
      { headers: { 'Content-Type': 'application/json' } })
      .do(res => {
        this.setSession(res);
      });

  }

  redirectAferLogin() {
    this.router.navigate([this.redirectUrl]);
  }

  logout(): void {
    localStorage.removeItem(this.keyToken);
    this.router.navigate(['login']);
  }

  private setSession(data) {
    if (data.success) {
      localStorage.setItem(this.keyToken, data.token);
    }
  }

  public getToken(): string {
    return localStorage.getItem(this.keyToken);
  }

  public isLoggedIn(): boolean {
    return this.getToken() != null;
  }
}
