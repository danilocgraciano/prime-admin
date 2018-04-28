import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from "./shared/home/home.component";
import { TableComponent } from "./shared/table/table.component";
import { AuthGuardService } from './auth.guard.service ';
import { LoginComponent } from './shared/auth/login/login.component';
import { UsuarioComponent } from './shared/usuario/usuario.component';
import { UsuarioFormComponent } from './shared/usuario/usuario-form/usuario-form.component';
import { PivotTableComponent } from './shared/pivot-table/pivot-table.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { title: 'Home' },
        canActivate: [AuthGuardService],
        children: [
            //USUÁRIOS
            { path: 'usuario', component: UsuarioComponent, data: { title: 'Usuários' } },
            { path: 'usuario/new', component: UsuarioFormComponent, data: { title: 'Novo Usuário' } },
            { path: 'usuario/:id', component: UsuarioFormComponent, data: { title: 'Editar Usuário' } },
            //OUTROS
            { path: 'simpleTable', component: TableComponent, data: { title: 'Simple Table' } },
            { path: 'pivotTable', component: PivotTableComponent, data: { title: 'Pivot Table' } }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'login' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);