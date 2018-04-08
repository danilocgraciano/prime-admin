import { Component, OnInit } from '@angular/core';
import { AbstractTableComponent } from '../table/abstract.table.component';
import { DataTableSetup } from '../table/DataTableSetup';

@Component({
  selector: 'app-rest-table',
  templateUrl: './rest-table.component.html',
  styleUrls: ['./rest-table.component.css']
})
export class RestTableComponent extends AbstractTableComponent implements OnInit {

  columns: Array<any> = [
    { "data": "id" },
    { "data": "descricao" },
    { "data": "sigla" },
    { "data": "codigoIbge" }
  ];

  buttons: Array<any> = [
    {
      text: 'Novo',
      action: function (e, dt, node, config) {
        alert('Novo activated');
      }
    }, {
      text: 'Editar',
      action: function (e, dt, node, config) {
        alert('Editar activated');
      }
    }, {
      text: 'Excluir',
      action: function (e, dt, node, config) {
        alert('Excluir activated');
      }
    }, {
      extend: 'excelHtml5',
      exportOptions: {
        columns: ':visible'
      }
    }, {
      extend: 'pdfHtml5',
      exportOptions: {
        columns: ':visible'
      }
    },
    {
      extend: 'colvis',
      text: 'Exibir'
    }];

  ngOnInit() {
    this.init("myTable", new DataTableSetup({
      processing: true,
      serverSide: true,
      "ajax": "/api/uf",
      buttons: this.buttons,
      columns: this.columns,
      columnDefs: [
        {
          targets: [0],
          visible: false,
          searchable: false
        }
      ]
    }));
  }

}
