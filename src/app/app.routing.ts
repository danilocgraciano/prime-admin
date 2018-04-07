import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./shared/home/home.component";
import { TableComponent } from "./shared/table/table.component";

const APP_ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'table', component: TableComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);