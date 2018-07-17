import { Component, OnInit } from '@angular/core';
import { AbstractTableComponent } from '../../shared/table/abstract.table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { InfoDialogComponent } from '../../shared/dialog/info-dialog/info-dialog.component';
import { ConfirmDialogComponent } from '../../shared/dialog/confirm-dialog/confirm-dialog.component';
import { DataTableSetup } from '../../shared/table/DataTableSetup';
import { UfService } from './uf.service';

@Component({
  selector: 'app-uf',
  templateUrl: './uf.component.html',
  styleUrls: ['./uf.component.css']
})
export class UfComponent extends AbstractTableComponent implements OnInit {

  static this: any;
  url: string = '/uf/';
  title: string;
  private bsModalRef: BsModalRef;

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title,
    private modalService: BsModalService, private service: UfService) {
    super();
    this.titleService.setTitle(route.snapshot.data['title']);
    UfComponent.this = this;

    UfComponent.this.onDblclick.subscribe((data) => {
      UfComponent.this.router.navigate([this.url + data['id']]);
    });

  }

  columns: Array<any> = [
    {
      "data": "id",
      "name": "uf_id",
      "defaultContent": ""
    },
    {
      "data": "sigla",
      "name": "uf_sigla",
      "defaultContent": ""
    },
    {
      "data": "descricao",
      "name": "uf_descricao",
      "defaultContent": ""
    },
    {
      "data": "codigoIbge",
      "name": "uf_codigoibge",
      "defaultContent": ""
    }
  ];

  buttons: Array<any> = [
    {
      text: 'Novo',
      action: function (e, dt, node, config) {
        UfComponent.this.router.navigate([UfComponent.this.url + '/new']);
      }
    }, {
      text: 'Editar',
      action: function (e, dt, node, config) {
        let selectedRow = UfComponent.this.getSelection();
        if (selectedRow) {
          UfComponent.this.router.navigate([UfComponent.this.url + + selectedRow['id']]);
        } else {
          const initialState = {
            message: 'Selecione o registro que deseja alterar',
            title: 'Atenção'
          };
          UfComponent.this.modalService.show(InfoDialogComponent, {
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

        this.bsModalRef = UfComponent.this.modalService.show(ConfirmDialogComponent, {
          initialState
        });

        this.bsModalRef.content.onClose.subscribe(result => {
          if (result) {

            let selectedRow = UfComponent.this.getSelection();

            if (selectedRow) {
              var id = selectedRow['id']

              UfComponent.this.service.deleteById(id).subscribe(resp => {

                const initialState = {
                  message: resp['msg'],
                  title: (resp['success'] === true) ? 'Atenção' : 'Erro'
                };

                UfComponent.this.modalService.onHidden.subscribe((reason: string) => {

                  if (resp['success'] === true) {
                    UfComponent.this.removeSelection();
                  }
                });

                UfComponent.this.modalService.show(InfoDialogComponent, {
                  initialState
                });

              });
            } else {
              const initialState = {
                message: 'Selecione o registro que deseja excluir',
                title: 'Atenção'
              };
              UfComponent.this.modalService.show(InfoDialogComponent, {
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
        url: "/api/uf"
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
  }
}
