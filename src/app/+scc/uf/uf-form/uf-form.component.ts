import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { InfoDialogComponent } from '../../../shared/dialog/info-dialog/info-dialog.component';

import { UF } from '../uf';
import { UfService } from '../uf.service';

@Component({
  selector: 'app-uf-form',
  templateUrl: './uf-form.component.html',
  styleUrls: ['./uf-form.component.css']
})
export class UfFormComponent implements OnInit {

  url: string = '/uf/';
  uf: UF = new UF();

  form: FormGroup;
  title: string = 'Cadastro de UF';
  mode: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private service: UfService, private modalService: BsModalService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: ['', []],
      sigla: ['', [Validators.required]],
      descricao: ['', [
        Validators.required
      ]],
      codigoIbge: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2)
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
          this.uf = resp['data'];
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
