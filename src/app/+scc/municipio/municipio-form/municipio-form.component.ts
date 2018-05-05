import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { InfoDialogComponent } from '../../../shared/dialog/info-dialog/info-dialog.component';
import { Municipio } from '../municipio';
import { MunicipioComponent } from '../municipio.component';
import { MunicipioService } from '../municipio.service';
import { UfService } from '../../uf/uf.service';
import { PaisService } from '../../pais/pais.service';
import { UF } from '../../uf/uf';
import { Pais } from '../../pais/pais';

@Component({
  selector: 'app-municipio-form',
  templateUrl: './municipio-form.component.html',
  styleUrls: ['./municipio-form.component.css']
})
export class MunicipioFormComponent implements OnInit {

  url: string = '/municipio/';
  municipio: Municipio = new Municipio();

  form: FormGroup;
  title: string = 'Cadastro de Município';
  mode: string;

  ufList: Array<UF> = new Array<UF>();

  paisList: Array<Pais> = new Array<Pais>();

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private municipioService: MunicipioService, private ufService: UfService, private paisService: PaisService, private modalService: BsModalService) { }

  ngOnInit() {

    this.ufService.search().subscribe((data) => {
      this.ufList = data['data'];
    });

    this.paisService.search().subscribe((data) => {
      this.paisList = data['data'];
    });

    this.form = this.formBuilder.group({
      id: ['', []],
      nome: ['', [Validators.required]],
      codigoMunicipal: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7)
      ]],
      uf: this.formBuilder.group({
        id: ['', [Validators.required]]
      }),
      pais: this.formBuilder.group({
        id: ['', [Validators.required]]
      })
    });

    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.mode = id ? ' (Edição)' : ' (Novo)';

      if (!id)
        return;

      this.municipioService.readById(id).subscribe(resp => {
        if (!resp['success']) {
          const initialState = {
            message: resp['msg'],
            title: 'Erro'
          };
          this.modalService.show(InfoDialogComponent, {
            initialState
          });
        } else {
          this.municipio = resp['data'];
        }
      });

    });
  }

  onSubmit() {
    if (this.form.valid) {
      var result;
      var id = this.form.value.id;
      if (id) {
        result = this.municipioService.update(this.form.value);
      } else {
        result = this.municipioService.create(this.form.value);
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
