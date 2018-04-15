import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UsuarioService } from '../usuario.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { InfoDialogComponent } from '../../dialog/info-dialog/info-dialog.component';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  usuario: Usuario = new Usuario();
  form: FormGroup;
  title: string = 'Cadastro de Usuário';
  mode: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private service: UsuarioService, private modalService: BsModalService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: ['', []],
      nome: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      senha: ['', []]
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
          this.usuario = resp['data'];
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
            this.router.navigate(['/usuario/']);
          }
        });

        this.modalService.show(InfoDialogComponent, {
          initialState
        });

      });
    }

  }

}
