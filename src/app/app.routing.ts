import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from "./shared/home/home.component";
import { TableComponent } from "./shared/table/table.component";
import { RestTableComponent } from "./shared/rest-table/rest-table.component";
import { AuthGuardService } from './auth.guard.service ';
import { LoginComponent } from './shared/auth/login/login.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { title: 'Home' },
        canActivate: [AuthGuardService],
        children: [
            { path: 'simpleTable', component: TableComponent, data: { title: 'Simple Table' }, },
            { path: 'restTable', component: RestTableComponent, data: { title: 'Rest Table' }, }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'login' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);