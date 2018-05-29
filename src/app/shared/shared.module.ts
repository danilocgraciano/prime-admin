import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { DataTableModule } from 'primeng/datatable';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';


import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { TableComponent } from './table/table.component';
import { InfoDialogComponent } from './dialog/info-dialog/info-dialog.component';
import { AuthGuardService } from '../auth.guard.service ';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthService } from './auth/auth.service';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioService } from './usuario/usuario.service';
import { InvalidTypeDirective } from './form-validation/InvalidTypeDirective';
import { InvalidMessageDirective } from './form-validation/InvalidmessageDirective';
import { MyFormGroupDirective } from './form-validation/MyFormGroupDirective';
import { MyFormControlDirective } from './form-validation/MyFormControlDirective';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { SharedRoutingModule } from './shared.routing.module';
import { MaskTelefonePipe } from './pipes/mask-telefone.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgSelectModule,
    DataTableModule,
    DropdownModule,
    InputMaskModule,
    ButtonModule,
    DialogModule,
    SharedRoutingModule
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
    UsuarioFormComponent,
    InvalidMessageDirective,
    InvalidTypeDirective,
    MyFormGroupDirective,
    MyFormControlDirective,
    ConfirmDialogComponent,
    MaskTelefonePipe
  ],
  exports: [HomeComponent, InfoDialogComponent, InvalidMessageDirective, InvalidTypeDirective, MyFormGroupDirective, MyFormControlDirective, NgSelectModule, ModalModule, DataTableModule, DropdownModule, InputMaskModule, CalendarModule, MaskTelefonePipe, ButtonModule, DialogModule],
  providers: [AuthService, AuthGuardService, UsuarioService],
  entryComponents: [InfoDialogComponent, ConfirmDialogComponent]
})
export class SharedModule { }
