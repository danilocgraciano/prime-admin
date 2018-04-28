import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NegocianteComponent } from './negociante/negociante.component';
import { NegocianteFormComponent } from './negociante/negociante-form/negociante-form.component';

const APP_ROUTES = [
    { path: 'negociante', component: NegocianteComponent, data: { title: 'Negociantes' } },
    { path: 'negociante/new', component: NegocianteFormComponent, data: { title: 'Novo Negociante' } },
    { path: 'negociante/:id', component: NegocianteFormComponent, data: { title: 'Editar Negociante' } }
];

@NgModule({
    imports: [RouterModule.forChild(APP_ROUTES)],
    exports: [RouterModule]
})
export class SccRoutingModule { }
