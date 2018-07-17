import { Component, OnInit } from '@angular/core';
import { AbstractTableComponent } from '../../shared/table/abstract.table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NegocianteService } from './negociante.service';
import { InfoDialogComponent } from '../../shared/dialog/info-dialog/info-dialog.component';
import { ConfirmDialogComponent } from '../../shared/dialog/confirm-dialog/confirm-dialog.component';
import { DataTableSetup } from '../../shared/table/DataTableSetup';

@Component({
  selector: 'app-negociante',
  templateUrl: './negociante.component.html',
  styleUrls: ['./negociante.component.css']
})
export class NegocianteComponent extends AbstractTableComponent implements OnInit {

  static this: any;
  title: string;
  private bsModalRef: BsModalRef;

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title,
    private modalService: BsModalService, private service: NegocianteService) {
    super();
    this.titleService.setTitle(route.snapshot.data['title']);
    NegocianteComponent.this = this;

    NegocianteComponent.this.onDblclick.subscribe((data) => {
      NegocianteComponent.this.router.navigate(['/negociante/' + data['id']]);
    });

  }

  columns: Array<any> = [
    {
      "data": "id",
      "name": "negociante_id",
      "defaultContent": ""
    },
    {
      "data": "codigo",
      "name": "negociante_codigo",
      "defaultContent": ""
    },
    {
      "data": "nome",
      "name": "negociante_nome",
      "defaultContent": ""
    },
    {
      "data": "cpfCnpj",
      "name": "negociante_cpfcnpj",
      "defaultContent": ""
    }
  ];

  buttons: Array<any> = [
    {
      text: 'Novo',
      action: function (e, dt, node, config) {
        NegocianteComponent.this.router.navigate(['/negociante/new']);
      }
    }, {
      text: 'Editar',
      action: function (e, dt, node, config) {
        let selectedRow = NegocianteComponent.this.getSelection();
        if (selectedRow) {
          NegocianteComponent.this.router.navigate(['/negociante/' + selectedRow['id']]);
        } else {
          const initialState = {
            message: 'Selecione o registro que deseja alterar',
            title: 'Atenção'
          };
          NegocianteComponent.this.modalService.show(InfoDialogComponent, {
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

        this.bsModalRef = NegocianteComponent.this.modalService.show(ConfirmDialogComponent, {
          initialState
        });

        this.bsModalRef.content.onClose.subscribe(result => {
          if (result) {

            let selectedRow = NegocianteComponent.this.getSelection();

            if (selectedRow) {
              var id = selectedRow['id']

              NegocianteComponent.this.service.deleteById(id).subscribe(resp => {

                const initialState = {
                  message: resp['msg'],
                  title: (resp['success'] === true) ? 'Atenção' : 'Erro'
                };

                NegocianteComponent.this.modalService.onHidden.subscribe((reason: string) => {

                  if (resp['success'] === true) {
                    NegocianteComponent.this.removeSelection();
                  }
                });

                NegocianteComponent.this.modalService.show(InfoDialogComponent, {
                  initialState
                });

              });
            } else {
              const initialState = {
                message: 'Selecione o registro que deseja excluir',
                title: 'Atenção'
              };
              NegocianteComponent.this.modalService.show(InfoDialogComponent, {
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
        url: "/api/negociante"
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
