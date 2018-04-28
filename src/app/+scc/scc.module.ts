import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NegocianteComponent } from './negociante/negociante.component';
import { NegocianteService } from './negociante/negociante.service';
import { NegocianteFormComponent } from './negociante/negociante-form/negociante-form.component';
import { SharedModule } from '../shared/shared.module';
import { SccRoutingModule } from './scc.routing.module';

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
    NegocianteFormComponent
  ],
  providers: [NegocianteService]
})
export class SccModule { }
