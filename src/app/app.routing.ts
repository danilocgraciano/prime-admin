import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./home/home/home.component";

const APP_ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);