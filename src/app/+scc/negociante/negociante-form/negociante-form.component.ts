import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Negociante } from '../negociante';
import { NegocianteService } from '../negociante.service';
import { InfoDialogComponent } from '../../../shared/dialog/info-dialog/info-dialog.component';

@Component({
  selector: 'app-negociante-form',
  templateUrl: './negociante-form.component.html',
  styleUrls: ['./negociante-form.component.css']
})
export class NegocianteFormComponent implements OnInit {

  negociante: Negociante = new Negociante();
  form: FormGroup;
  title: string = 'Cadastro de Negociante';
  mode: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private service: NegocianteService, private modalService: BsModalService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: ['', []],
      codigo: ['', []],
      nome: ['', [
        Validators.required
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
          this.negociante = resp['data'];
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
            this.router.navigate(['/negociante/']);
          }
        });

        this.modalService.show(InfoDialogComponent, {
          initialState
        });

      });
    }
  }

}
