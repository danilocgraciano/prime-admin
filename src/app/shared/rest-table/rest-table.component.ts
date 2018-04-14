import { Component, OnInit } from '@angular/core';
import { AbstractTableComponent } from '../table/abstract.table.component';
import { DataTableSetup } from '../table/DataTableSetup';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rest-table',
  templateUrl: './rest-table.component.html',
  styleUrls: ['./rest-table.component.css']
})
export class RestTableComponent extends AbstractTableComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private titleService: Title) {
    super();
    this.titleService.setTitle(route.snapshot.data['title']);
  }

  columns: Array<any> = [
    {
      "data": "id",
      "name": "uf_id"
    },
    {
      "data": "descricao",
      "name": "uf_descricao"
    },
    {
      "data": "sigla",
      "name": "uf_sigla"
    },
    {
      "data": "codigoIbge",
      "name": "uf_codigoibge"
    }
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
      ajax: "/api/uf",
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
