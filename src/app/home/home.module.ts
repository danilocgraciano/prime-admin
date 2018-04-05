import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthModule } from "../auth/auth.module";

@NgModule({
  imports: [
    CommonModule,
    AuthModule
  ],
  exports: [HomeComponent],
  declarations: [
    HomeComponent,
    NavbarComponent
  ]
})
export class HomeModule { }
