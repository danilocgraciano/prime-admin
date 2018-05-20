import { Component, OnInit } from '@angular/core';
import { AbstractTableComponent } from '../../shared/table/abstract.table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { InfoDialogComponent } from '../../shared/dialog/info-dialog/info-dialog.component';
import { ConfirmDialogComponent } from '../../shared/dialog/confirm-dialog/confirm-dialog.component';
import { DataTableSetup } from '../../shared/table/DataTableSetup';
import { MunicipioService } from './municipio.service';
declare var $;

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.css']
})
export class MunicipioComponent extends AbstractTableComponent implements OnInit {

  url: string = '/municipio/';
  static this: any;
  title: string;
  private bsModalRef: BsModalRef;

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title,
    private modalService: BsModalService, private service: MunicipioService) {
    super();
    this.titleService.setTitle(route.snapshot.data['title']);
    MunicipioComponent.this = this;

    MunicipioComponent.this.onDblclick.subscribe((data) => {
      MunicipioComponent.this.router.navigate([this.url + data['id']]);
    });

  }

  columns: Array<any> = [
    {
      "data": "id",
      "name": "municipio_id",
      "defaultContent": ""
    },
    {
      "data": "nome",
      "name": "municipio_nome",
      "defaultContent": ""
    },
    {
      "data": "codigoMunicipal",
      "name": "municipio_codigomunicipal",
      "defaultContent": ""
    },
    {
      "data": "uf.sigla",
      "name": "uf_sigla",
      "defaultContent": ""
    },
    {
      "data": "pais.descricao",
      "name": "pais_descricao",
      "defaultContent": ""
    }
  ];

  buttons: Array<any> = [
    {
      text: 'Novo',
      action: function (e, dt, node, config) {
        MunicipioComponent.this.router.navigate([MunicipioComponent.this.url + 'new']);
      }
    }, {
      text: 'Editar',
      action: function (e, dt, node, config) {
        let selectedRow = MunicipioComponent.this.getSelection();
        if (selectedRow) {
          MunicipioComponent.this.router.navigate([MunicipioComponent.this.url + selectedRow['id']]);
        } else {
          const initialState = {
            message: 'Selecione o registro que deseja alterar',
            title: 'Atenção'
          };
          MunicipioComponent.this.modalService.show(InfoDialogComponent, {
            initialState
          });
        }
      }
    }, {
      text: 'Excluir',
      action: function (e, dt, node, config) {

        const initialState = {
          title: 'Atenção',
          message: 'Deseja realmente EXCLUIR?',
        };

        this.bsModalRef = MunicipioComponent.this.modalService.show(ConfirmDialogComponent, {
          initialState
        });

        this.bsModalRef.content.onClose.subscribe(result => {
          if (result) {

            let selectedRow = MunicipioComponent.this.getSelection();

            if (selectedRow) {
              var id = selectedRow['id']

              MunicipioComponent.this.service.deleteById(id).subscribe(resp => {

                const initialState = {
                  message: resp['msg'],
                  title: (resp['success'] === true) ? 'Atenção' : 'Erro'
                };

                MunicipioComponent.this.modalService.onHidden.subscribe((reason: string) => {

                  if (resp['success'] === true) {
                    MunicipioComponent.this.removeSelection();
                  }
                });

                MunicipioComponent.this.modalService.show(InfoDialogComponent, {
                  initialState
                });

              });
            } else {
              const initialState = {
                message: 'Selecione o registro que deseja excluir',
                title: 'Atenção'
              };
              MunicipioComponent.this.modalService.show(InfoDialogComponent, {
                initialState
              });
            }


          }
        })
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
      ajax: {
        type: "GET",
        url: "/api/municipio",
        data: function (d) {
          d.municipio_nome = $('#nome').val();
          d.municipio_codigomunicipal = $('#codigoMunicipal').val();
          d.uf_sigla = $('#uf').val();
          d.pais_descricao = $('#pais').val();
        }
      },
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

    Observable.fromEvent($('#nome'), 'keyup').debounceTime(500).subscribe((x) => {
      this.myTable.draw();
    });

    Observable.fromEvent($('#codigoMunicipal'), 'keyup').debounceTime(500).subscribe((x) => {
      this.myTable.draw();
    });

    Observable.fromEvent($('#uf'), 'keyup').debounceTime(500).subscribe((x) => {
      this.myTable.draw();
    });

    Observable.fromEvent($('#pais'), 'keyup').debounceTime(500).subscribe((x) => {
      this.myTable.draw();
    });
  }
}