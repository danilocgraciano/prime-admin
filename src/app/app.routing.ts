import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./shared/home/home.component";
import { TableComponent } from "./shared/table/table.component";
import { RestTableComponent } from "./shared/rest-table/rest-table.component";

const APP_ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'table', component: TableComponent },
    { path: 'restTable', component: RestTableComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);