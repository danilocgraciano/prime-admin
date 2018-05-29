import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

import { Telefone } from '../../telefone';

@Component({
  selector: 'app-negociante-form-telefone',
  templateUrl: './negociante-form-telefone.component.html',
  styleUrls: ['./negociante-form-telefone.component.css']
})
export class NegocianteFormTelefoneComponent implements OnInit {

  displayDialog: boolean = false;
  _telefone: Telefone = new Telefone();
  form: FormGroup;

  tipoTelefoneList = [
    { value: 0, label: "Fixo" },
    { value: 1, label: "Celular" },
    { value: 2, label: "Fax" },
    { value: 3, label: "Outros" }
  ];

  @Output('telefonesChange') dataSourceChange: EventEmitter<Array<Telefone>> = new EventEmitter<Array<Telefone>>();
  @Input('telefones') dataSource: Array<Telefone>;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: ['', []],
      tipoNumero: ['', []],
      telefone: ['', [
        Validators.required, Validators.pattern("[0-9]+$")
      ]]
    });
  }

  onDeleteClick(event, data: Telefone) {
    event.preventDefault();
    this.dataSource.splice(this.dataSource.indexOf(data), 1);
  }

  onShowClick(event) {
    event.preventDefault();
    this._telefone = new Telefone();
    this._telefone.tipoNumero = 0;
    this.displayDialog = true;
  }

  onAddClick(event) {
    event.preventDefault();
    this.dataSource.push(this._telefone);
    this._telefone = new Telefone();
    this.displayDialog = false;
  }

}
