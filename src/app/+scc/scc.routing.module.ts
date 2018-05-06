import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NegocianteComponent } from './negociante/negociante.component';
import { NegocianteFormComponent } from './negociante/negociante-form/negociante-form.component';
import { UfFormComponent } from './uf/uf-form/uf-form.component';
import { UfComponent } from './uf/uf.component';
import { PaisComponent } from './pais/pais.component';
import { PaisFormComponent } from './pais/pais-form/pais-form.component';
import { MunicipioComponent } from './municipio/municipio.component';
import { MunicipioFormComponent } from './municipio/municipio-form/municipio-form.component';
import { CepComponent } from './cep/cep.component';
import { CepFormComponent } from './cep/cep-form/cep-form.component';

const APP_ROUTES = [
    { path: 'negociante', component: NegocianteComponent, data: { title: 'Negociantes' } },
    { path: 'negociante/new', component: NegocianteFormComponent, data: { title: 'Novo Negociante' } },
    { path: 'negociante/:id', component: NegocianteFormComponent, data: { title: 'Editar Negociante' } },

    { path: 'uf', component: UfComponent, data: { title: 'Unidades Federativas' } },
    { path: 'uf/new', component: UfFormComponent, data: { title: 'Nova UF' } },
    { path: 'uf/:id', component: UfFormComponent, data: { title: 'Editar UF' } },

    { path: 'pais', component: PaisComponent, data: { title: 'Países' } },
    { path: 'pais/new', component: PaisFormComponent, data: { title: 'Novo País' } },
    { path: 'pais/:id', component: PaisFormComponent, data: { title: 'Editar País' } },

    { path: 'municipio', component: MunicipioComponent, data: { title: 'Municípios' } },
    { path: 'municipio/new', component: MunicipioFormComponent, data: { title: 'Novo Município' } },
    { path: 'municipio/:id', component: MunicipioFormComponent, data: { title: 'Editar Município' } },

    { path: 'cep', component: CepComponent, data: { title: 'CEP' } },
    { path: 'cep/new', component: CepFormComponent, data: { title: 'Novo CEP' } },
    { path: 'cep/:id', component: CepFormComponent, data: { title: 'Editar CEP' } }
];

@NgModule({
    imports: [RouterModule.forChild(APP_ROUTES)],
    exports: [RouterModule]
})
export class SccRoutingModule { }
