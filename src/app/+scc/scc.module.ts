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
import { MunicipioComponent } from './municipio/municipio.component';
import { MunicipioFormComponent } from './municipio/municipio-form/municipio-form.component';
import { MunicipioService } from './municipio/municipio.service';
import { CepComponent } from './cep/cep.component';
import { CepFormComponent } from './cep/cep-form/cep-form.component';
import { CepService } from './cep/cep.service';
import { NegocianteFormEnderecoComponent } from './negociante/negociante-form/negociante-form-endereco/negociante-form-endereco.component';
import { NegocianteFormTelefoneComponent } from './negociante/negociante-form/negociante-form-telefone/negociante-form-telefone.component';

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
    NegocianteFormTelefoneComponent,
    NegocianteFormEnderecoComponent,
    UfComponent,
    UfFormComponent,
    PaisComponent,
    PaisFormComponent,
    MunicipioComponent,
    MunicipioFormComponent,
    CepComponent,
    CepFormComponent
  ],
  providers: [NegocianteService, UfService, PaisService, MunicipioService, CepService]
})
export class SccModule { }
