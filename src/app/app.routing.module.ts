import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './shared/home/home.component';
import { AuthGuardService } from './auth.guard.service ';
import { UsuarioComponent } from './shared/usuario/usuario.component';
import { UsuarioFormComponent } from './shared/usuario/usuario-form/usuario-form.component';
import { TableComponent } from './shared/table/table.component';
import { LoginComponent } from './shared/auth/login/login.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home' },
    canActivate: [AuthGuardService],
    children: [
      //SHARED
      {
        path: '',
        loadChildren: './shared/shared.module#SharedModule'
      },
      //SCC
      {
        path: '',
        loadChildren: './+scc/scc.module#SccModule'
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
