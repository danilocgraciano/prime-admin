import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { InfoDialogComponent } from '../../../shared/dialog/info-dialog/info-dialog.component';
import { Cep } from '../cep';
import { CepService } from '../cep.service';
import { Municipio } from '../../municipio/municipio';
import { MunicipioService } from '../../municipio/municipio.service';


@Component({
  selector: 'app-cep-form',
  templateUrl: './cep-form.component.html',
  styleUrls: ['./cep-form.component.css']
})
export class CepFormComponent implements OnInit {

  url: string = '/cep/';
  cep: Cep = new Cep();

  form: FormGroup;
  title: string = 'Cadastro de CEP';
  mode: string;

  municipio$: Observable<any>

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private service: CepService, private municipioService: MunicipioService, private modalService: BsModalService) { }

  ngOnInit() {

    this.municipio$ = this.municipioService.search().map(obj => obj['data']);

    this.form = this.formBuilder.group({
      id: ['', []],
      codigo: ['', [Validators.required, Validators.pattern('[0-9]{5}-[0-9]{3}')]],
      logradouro: ['', []],
      bairro: ['', []],
      municipio: this.formBuilder.group({
        id: ['', [Validators.required]]
      }),
    });

    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.mode = id ? ' (Edição)' : ' (Novo)';

      if (!id)
        return;

      this.service.readById(id).subscribe(resp => {
        if (!resp['success']) {
          const initialState = {
            message: resp['msg'],
            title: 'Erro'
          };
          this.modalService.show(InfoDialogComponent, {
            initialState
          });
        } else {
          this.cep = resp['data'];
        }
      });

    });
  }

  onSubmit() {
    if (this.form.valid) {
      var result;
      var id = this.form.value.id;
      if (id) {
        result = this.service.update(this.form.value);
      } else {
        result = this.service.create(this.form.value);
      }
      result.subscribe((resp) => {


        const initialState = {
          message: resp['msg'],
          title: (resp['success'] === true) ? 'Atenção' : 'Erro'
        };

        this.modalService.onHidden.subscribe((reason: string) => {

          if (resp['success'] === true) {
            this.router.navigate([this.url]);
          }
        });

        this.modalService.show(InfoDialogComponent, {
          initialState
        });

      });
    }
  }

}
