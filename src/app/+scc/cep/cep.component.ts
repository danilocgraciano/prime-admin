import { Component, OnInit } from '@angular/core';
import { AbstractTableComponent } from '../../shared/table/abstract.table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { InfoDialogComponent } from '../../shared/dialog/info-dialog/info-dialog.component';
import { ConfirmDialogComponent } from '../../shared/dialog/confirm-dialog/confirm-dialog.component';
import { DataTableSetup } from '../../shared/table/DataTableSetup';
import { CepService } from './cep.service';
declare var $;

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.css']
})
export class CepComponent extends AbstractTableComponent implements OnInit {

  static this: any;
  url: string = '/cep/';
  title: string;
  private bsModalRef: BsModalRef;

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title,
    private modalService: BsModalService, private service: CepService) {
    super();
    this.titleService.setTitle(route.snapshot.data['title']);
    CepComponent.this = this;

    CepComponent.this.onDblclick.subscribe((data) => {
      CepComponent.this.router.navigate([this.url + data['id']]);
    });

  }

  columns: Array<any> = [
    {
      "data": "id",
      "name": "cep_id",
      "defaultContent": ""
    },
    {
      "data": "codigo",
      "name": "cep_codigo",
      "defaultContent": ""
    },
    {
      "data": "logradouro",
      "name": "cep_logradouro",
      "defaultContent": ""
    },
    {
      "data": "bairro",
      "name": "cep_bairro",
      "defaultContent": ""
    },
    {
      "data": "municipio.nome",
      "name": "municipio_nome",
      "defaultContent": ""
    }
  ];

  buttons: Array<any> = [
    {
      text: 'Novo',
      action: function (e, dt, node, config) {
        CepComponent.this.router.navigate([CepComponent.this.url + '/new']);
      }
    }, {
      text: 'Editar',
      action: function (e, dt, node, config) {
        let selectedRow = CepComponent.this.getSelection();
        if (selectedRow) {
          CepComponent.this.router.navigate([CepComponent.this.url + + selectedRow['id']]);
        } else {
          const initialState = {
            message: 'Selecione o registro que deseja alterar',
            title: 'Atenção'
          };
          CepComponent.this.modalService.show(InfoDialogComponent, {
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

        this.bsModalRef = CepComponent.this.modalService.show(ConfirmDialogComponent, {
          initialState
        });

        this.bsModalRef.content.onClose.subscribe(result => {
          if (result) {

            let selectedRow = CepComponent.this.getSelection();

            if (selectedRow) {
              var id = selectedRow['id']

              CepComponent.this.service.deleteById(id).subscribe(resp => {

                const initialState = {
                  message: resp['msg'],
                  title: (resp['success'] === true) ? 'Atenção' : 'Erro'
                };

                CepComponent.this.modalService.onHidden.subscribe((reason: string) => {

                  if (resp['success'] === true) {
                    CepComponent.this.removeSelection();
                  }
                });

                CepComponent.this.modalService.show(InfoDialogComponent, {
                  initialState
                });

              });
            } else {
              const initialState = {
                message: 'Selecione o registro que deseja excluir',
                title: 'Atenção'
              };
              CepComponent.this.modalService.show(InfoDialogComponent, {
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
        url: "/api/cep",
        data: function (d) {
          d.cep_codigo = $('#codigo').val();
          d.cep_logradouro = $('#logradouro').val();
          d.cep_bairro = $('#bairro').val();
          d.municipio_nome = $('#municipio').val();
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

    Observable.fromEvent($('#codigo'), 'keyup').debounceTime(500).subscribe((x) => {
      this.myTable.draw();
    });

    Observable.fromEvent($('#logradouro'), 'keyup').debounceTime(500).subscribe((x) => {
      this.myTable.draw();
    });

    Observable.fromEvent($('#bairro'), 'keyup').debounceTime(500).subscribe((x) => {
      this.myTable.draw();
    });

    Observable.fromEvent($('#municipio'), 'keyup').debounceTime(500).subscribe((x) => {
      this.myTable.draw();
    });
  }

}
