import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { InfoDialogComponent } from '../../../shared/dialog/info-dialog/info-dialog.component';

import { Pais } from '../pais';
import { PaisService } from '../pais.service';

@Component({
  selector: 'app-pais-form',
  templateUrl: './pais-form.component.html',
  styleUrls: ['./pais-form.component.css']
})
export class PaisFormComponent implements OnInit {

  url: string = '/pais/';
  pais: Pais = new Pais();

  form: FormGroup;
  title: string = 'Cadastro de País';
  mode: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private service: PaisService, private modalService: BsModalService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: ['', []],
      sigla: ['', [Validators.required]],
      descricao: ['', [
        Validators.required
      ]],
      codigoBacen: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ]]
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
          this.pais = resp['data'];
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
