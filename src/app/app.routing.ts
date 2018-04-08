import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./shared/home/home.component";
import { TableComponent } from "./shared/table/table.component";
import { RestTableComponent } from "./shared/rest-table/rest-table.component";

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'table', component: TableComponent },
            { path: 'restTable', component: RestTableComponent }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'login' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);