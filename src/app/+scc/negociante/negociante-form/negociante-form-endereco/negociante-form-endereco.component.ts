import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Endereco } from '../../endereco';
import { CepService } from '../../../cep/cep.service';
import { Observable } from 'rxjs';
import { Cep } from '../../../cep/cep';
import { MunicipioService } from '../../../municipio/municipio.service';
import { PaisService } from '../../../pais/pais.service';

@Component({
  selector: 'app-negociante-form-endereco',
  templateUrl: './negociante-form-endereco.component.html',
  styleUrls: ['./negociante-form-endereco.component.css']
})
export class NegocianteFormEnderecoComponent implements OnInit {

  @Output('enderecosChange') dataSourceChange: EventEmitter<Array<Endereco>> = new EventEmitter<Array<Endereco>>();
  @Input('enderecos') dataSource: Array<Endereco>;

  cep$: Observable<any>;
  municipio$: Observable<any>;
  pais$: Observable<any>;

  enderecoOld: Endereco;

  displayDialog: boolean = false;
  _endereco: Endereco = new Endereco();
  form: FormGroup;

  tipoEnderecoList = [
    { value: 0, label: "Principal" },
    { value: 1, label: "Pagamento" },
    { value: 2, label: "Entrega" }
  ];

  constructor(private cepService: CepService, private municipioService: MunicipioService, private paisService: PaisService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cep$ = this.cepService.search().map(obj => obj['data']);
    this.municipio$ = this.municipioService.search().map(obj => obj['data']);
    this.pais$ = this.paisService.search().map(obj => obj['data']);

    this.form = this.formBuilder.group({
      id: ['', []],
      tipoEndereco: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: ['', []],
      bairro: ['', [Validators.required]],
      cep: this.formBuilder.group({
        id: ['', [Validators.required]],
        municipio: this.formBuilder.group({
          id: ['', [Validators.required]],
          pais: this.formBuilder.group({
            id: ['', [Validators.required]]
          })
        })
      })
    });
  }

  onDeleteClick(event, data: Endereco) {
    event.preventDefault();
    this.dataSource.splice(this.dataSource.indexOf(data), 1);
  }

  onCepChange(event) {

    let cep: Cep = event.value;

    let endereco: Endereco = new Endereco();
    endereco.bairro = cep.bairro;
    endereco.cep = cep;
    endereco.complemento = '';
    endereco.endereco = cep.logradouro;
    endereco.municipio = cep.municipio;
    endereco.numero = '';
    endereco.tipoEndereco = this.enderecoOld.tipoEndereco;

    this.dataSource[this.dataSource.indexOf(this.enderecoOld)] = endereco;
  }

  onShowClick(event) {
    event.preventDefault();
    this._endereco = new Endereco();
    this.displayDialog = true;
  }

  onAddClick(event) {
    event.preventDefault();
    this.dataSource.push(this._endereco);
    this._endereco = new Endereco();
    this.displayDialog = false;
  }

}
