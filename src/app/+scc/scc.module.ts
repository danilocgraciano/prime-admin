import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NegocianteComponent } from './negociante/negociante.component';
import { NegocianteService } from './negociante/negociante.service';
import { NegocianteFormComponent } from './negociante/negociante-form/negociante-form.component';
import { SharedModule } from '../shared/shared.module';
import { SccRoutingModule } from './scc.routing.module';
import { UfComponent } from './uf/uf.component';
import { UfFormComponent } from './uf/uf-form/uf-form.component';
import { UfService } from './uf/uf.service';
import { PaisService } from './pais/pais.service';
import { PaisComponent } from './pais/pais.component';
import { PaisFormComponent } from './pais/pais-form/pais-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SccRoutingModule
  ],
  declarations: [
    NegocianteComponent,
    NegocianteFormComponent,
    UfComponent,
    UfFormComponent,
    PaisComponent,
    PaisFormComponent
  ],
  providers: [NegocianteService, UfService, PaisService]
})
export class SccModule { }
