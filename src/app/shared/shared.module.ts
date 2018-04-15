import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal'

import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { TableComponent } from './table/table.component';
import { routing } from "../app.routing";
import { InfoDialogComponent } from './dialog/info-dialog/info-dialog.component';
import { AuthGuardService } from '../auth.guard.service ';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthService } from './auth/auth.service';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioService } from './usuario/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    routing
  ],
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarItemComponent,
    TableComponent,
    InfoDialogComponent,
    LoginComponent,
    LogoutComponent,
    UsuarioComponent,
    UsuarioFormComponent
  ],
  exports: [HomeComponent, InfoDialogComponent],
  providers: [AuthService, AuthGuardService, UsuarioService],
  entryComponents: [InfoDialogComponent]
})
export class SharedModule { }
