import { Injectable } from '@angular/core';
import { Usuario } from "./Usuario";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

  redirectUrl: string = '';

  constructor(private router: Router) { }

  login(usuario: Usuario) {
    console.log(usuario);
    this.router.navigate([this.redirectUrl]);
  }

  logout(): void {
    //destroy session
    this.router.navigate(['login']);
  }

}
