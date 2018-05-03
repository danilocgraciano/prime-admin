import { Component, OnInit } from '@angular/core';
import { AbstractTableComponent } from '../../shared/table/abstract.table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { InfoDialogComponent } from '../../shared/dialog/info-dialog/info-dialog.component';
import { ConfirmDialogComponent } from '../../shared/dialog/confirm-dialog/confirm-dialog.component';
import { DataTableSetup } from '../../shared/table/DataTableSetup';
import { PaisService } from './pais.service';
declare var $;

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent extends AbstractTableComponent implements OnInit {

  static this: any;
  title: string;
  private bsModalRef: BsModalRef;

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title,
    private modalService: BsModalService, private service: PaisService) {
    super();
    this.titleService.setTitle(route.snapshot.data['title']);
    PaisComponent.this = this;

    PaisComponent.this.onDblclick.subscribe((data) => {
      PaisComponent.this.router.navigate(['/pais/' + data['id']]);
    });

  }

  columns: Array<any> = [
    {
      "data": "id",
      "name": "pais_id",
      "defaultContent": ""
    },
    {
      "data": "descricao",
      "name": "pais_descricao",
      "defaultContent": ""
    },
    {
      "data": "sigla",
      "name": "pais_sigla",
      "defaultContent": ""
    },
    
    {
      "data": "codigoBacen",
      "name": "pais_codigobacen",
      "defaultContent": ""
    }
  ];

  buttons: Array<any> = [
    {
      text: 'Novo',
      action: function (e, dt, node, config) {
        PaisComponent.this.router.navigate(['/pais/new']);
      }
    }, {
      text: 'Editar',
      action: function (e, dt, node, config) {
        let selectedRow = PaisComponent.this.getSelection();
        if (selectedRow) {
          PaisComponent.this.router.navigate(['/pais/' + selectedRow['id']]);
        } else {
          const initialState = {
            message: 'Selecione o registro que deseja alterar',
            title: 'Atenção'
          };
          PaisComponent.this.modalService.show(InfoDialogComponent, {
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

        this.bsModalRef = PaisComponent.this.modalService.show(ConfirmDialogComponent, {
          initialState
        });

        this.bsModalRef.content.onClose.subscribe(result => {
          if (result) {

            let selectedRow = PaisComponent.this.getSelection();

            if (selectedRow) {
              var id = selectedRow['id']

              PaisComponent.this.service.deleteById(id).subscribe(resp => {

                const initialState = {
                  message: resp['msg'],
                  title: (resp['success'] === true) ? 'Atenção' : 'Erro'
                };

                PaisComponent.this.modalService.onHidden.subscribe((reason: string) => {

                  if (resp['success'] === true) {
                    PaisComponent.this.removeSelection();
                  }
                });

                PaisComponent.this.modalService.show(InfoDialogComponent, {
                  initialState
                });

              });
            } else {
              const initialState = {
                message: 'Selecione o registro que deseja excluir',
                title: 'Atenção'
              };
              PaisComponent.this.modalService.show(InfoDialogComponent, {
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
        url: "/api/pais"
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
