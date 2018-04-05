import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent, LogoutComponent],
  exports: [LoginComponent, LogoutComponent]
})
export class AuthModule { }
