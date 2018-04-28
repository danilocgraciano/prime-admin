import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { TableComponent } from './table/table.component';
import { PivotTableComponent } from './pivot-table/pivot-table.component';

const APP_ROUTES = [

    //USUÁRIOS
    { path: 'usuario', component: UsuarioComponent, data: { title: 'Usuários' } },
    { path: 'usuario/new', component: UsuarioFormComponent, data: { title: 'Novo Usuário' } },
    { path: 'usuario/:id', component: UsuarioFormComponent, data: { title: 'Editar Usuário' } },

    //OUTROS
    { path: 'simpleTable', component: TableComponent, data: { title: 'Simple Table' } },
    { path: 'pivotTable', component: PivotTableComponent, data: { title: 'Pivot Table' } }
];

@NgModule({
    imports: [RouterModule.forChild(APP_ROUTES)],
    exports: [RouterModule]
})
export class SharedRoutingModule { }
