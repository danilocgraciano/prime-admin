import { Component, OnInit } from '@angular/core';
import { AbstractTableComponent } from "./abstract.table.component";
import { DataTableSetup } from './DataTableSetup';
declare var $;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent extends AbstractTableComponent implements OnInit {

  header: Array<string> = ['ID', 'Usuário', 'E-mail'];

  data: Array<any> = [
    { id: 2, usuario: 'Danilo', email: 'danilo@compels.net' },
    { id: 3, usuario: 'Suporte', email: 'suporte@compels.net' },
    { id: 4, usuario: 'Alex', email: 'alex@compels.net' },
    { id: 5, usuario: 'Wesley', email: 'wesley@compels.net' },
    { id: 6, usuario: 'Leonardo', email: 'leonardo@compels.net' },
    { id: 7, usuario: 'Jader', email: 'jader@compels.net' },
    { id: 8, usuario: 'Renann', email: 'renann@compels.net' },
    { id: 9, usuario: 'Fernando', email: 'fernando@compels.net' },
    { id: 10, usuario: 'Lucas', email: 'lucas@compels.net' },
    { id: 11, usuario: 'Alessandro', email: 'alessandro@compels.net' },
    { id: 12, usuario: 'José Roberto', email: 'j.roberto@compels.net' },
    { id: 13, usuario: 'Denilson', email: 'denilson@compels.net' },
    { id: 14, usuario: 'Éliphas', email: 'eliphas@compels.net' },
    { id: 15, usuario: 'Pedro', email: 'pedro@compels.net' },
    { id: 16, usuario: 'Vander', email: 'vander@compels.net' }
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
      buttons: this.buttons,
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
