import { Component, OnInit } from '@angular/core';
import { AbstractTableComponent } from '../table/abstract.table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';

import { DataTableSetup } from '../table/DataTableSetup';
import { InfoDialogComponent } from '../dialog/info-dialog/info-dialog.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsuarioService } from './usuario.service';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
declare var $;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent extends AbstractTableComponent implements OnInit {

  static this: any;
  title: string;
  private bsModalRef: BsModalRef;

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title,
    private modalService: BsModalService, private usuarioService: UsuarioService) {
    super();
    this.titleService.setTitle(route.snapshot.data['title']);
    UsuarioComponent.this = this;

    UsuarioComponent.this.onDblclick.subscribe((data) => {
      UsuarioComponent.this.router.navigate(['/usuario/' + data['id']]);
    });

  }

  columns: Array<any> = [
    {
      "data": "id",
      "name": "usuario_id"
    },
    {
      "data": "nome",
      "name": "usuario_nome"
    },
    {
      "data": "email",
      "name": "usuario_email"
    }
  ];

  buttons: Array<any> = [
    {
      text: 'Novo',
      action: function (e, dt, node, config) {
        UsuarioComponent.this.router.navigate(['/usuario/new']);
      }
    }, {
      text: 'Editar',
      action: function (e, dt, node, config) {
        let selectedRow = UsuarioComponent.this.getSelection();
        if (selectedRow) {
          UsuarioComponent.this.router.navigate(['/usuario/' + selectedRow['id']]);
        } else {
          const initialState = {
            message: 'Selecione o registro que deseja alterar',
            title: 'Atenção'
          };
          UsuarioComponent.this.modalService.show(InfoDialogComponent, {
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

        this.bsModalRef = UsuarioComponent.this.modalService.show(ConfirmDialogComponent, {
          initialState
        });

        this.bsModalRef.content.onClose.subscribe(result => {
          if (result) {

            let selectedRow = UsuarioComponent.this.getSelection();

            if (selectedRow) {
              var id = selectedRow['id']

              UsuarioComponent.this.usuarioService.deleteById(id).subscribe(resp => {

                const initialState = {
                  message: resp['msg'],
                  title: (resp['success'] === true) ? 'Atenção' : 'Erro'
                };

                UsuarioComponent.this.modalService.onHidden.subscribe((reason: string) => {

                  if (resp['success'] === true) {
                    UsuarioComponent.this.removeSelection();
                  }
                });

                UsuarioComponent.this.modalService.show(InfoDialogComponent, {
                  initialState
                });

              });
            } else {
              const initialState = {
                message: 'Selecione o registro que deseja excluir',
                title: 'Atenção'
              };
              UsuarioComponent.this.modalService.show(InfoDialogComponent, {
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
        url: "/api/usuario",
        data: function (d) {
          d.usuario_nome = $('#nome').val();
          d.usuario_email = $('#email').val();
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

    Observable.fromEvent($('#email'), 'keyup').debounceTime(500).subscribe((x) => {
      this.myTable.draw();
    });
  }
}
