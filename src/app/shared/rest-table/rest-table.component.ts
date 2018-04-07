import { Component, OnInit } from '@angular/core';
import { AbstractRestTableComponent } from "./abstract.rest-table.component";

@Component({
  selector: 'app-rest-table',
  templateUrl: './rest-table.component.html',
  styleUrls: ['./rest-table.component.css']
})
export class RestTableComponent extends AbstractRestTableComponent implements OnInit {

  columns: Array<any> = [
    { "data": "id" },
    { "data": "descricao" },
    { "data": "sigla" },
    { "data": "codigoIbge" }
  ];

  ngOnInit() {
    this.init("myTable", false, 10, "/api/uf", this.columns);
  }

}
