import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AbstractTableComponent } from '../table/abstract.table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable, fromEvent, interval } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


import { DataTableSetup } from '../table/DataTableSetup';
import { InfoDialogComponent } from '../dialog/info-dialog/info-dialog.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsuarioService } from './usuario.service';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent extends AbstractTableComponent implements AfterViewInit {

  static this: any;
  url: string = '/usuario/';
  title: string;
  private bsModalRef: BsModalRef; c

  @ViewChild('nome') txtNome: ElementRef;
  @ViewChild('email') txtEmail: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title,
    private modalService: BsModalService, private usuarioService: UsuarioService) {
    super();
    this.titleService.setTitle(route.snapshot.data['title']);
    UsuarioComponent.this = this;

    UsuarioComponent.this.onDblclick.subscribe((data) => {
      UsuarioComponent.this.router.navigate([this.url + data['id']]);
    });

  }

  columns: Array<any> = [
    {
      "data": "id",
      "name": "usuario_id"
    },
    {
      "data": "nome",
      "name": "usuario_nome",
      "defaultContent": ""
    },
    {
      "data": "email",
      "name": "usuario_email",
      "defaultContent": ""
    }
  ];

  buttons: Array<any> = [
    {
      text: 'Novo',
      action: function (e, dt, node, config) {
        UsuarioComponent.this.router.navigate([this.url + '/new']);
      }
    }, {
      text: 'Editar',
      action: function (e, dt, node, config) {
        let selectedRow = UsuarioComponent.this.getSelection();
        if (selectedRow) {
          UsuarioComponent.this.router.navigate([this.url + selectedRow['id']]);
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


  ngAfterViewInit() {

    this.init("myTable", new DataTableSetup({
      processing: true,
      serverSide: true,
      ajax: {
        // https://medium.com/code-kings/datatables-js-how-to-update-your-data-object-for-ajax-json-data-retrieval-c1ac832d7aa5
        type: "GET",
        url: "/api/usuario",
        data: function (d) {
          d.usuario_nome = UsuarioComponent.this.txtNome.nativeElement.value;
          d.usuario_email = UsuarioComponent.this.txtEmail.nativeElement.value;
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

    fromEvent(this.txtNome.nativeElement, 'keyup').pipe(
      debounceTime(500)
    ).subscribe((x) => {
      this.myTable.draw();
    });

    fromEvent(this.txtEmail.nativeElement, 'keyup').pipe(
      debounceTime(500)
    ).subscribe((x) => {
      this.myTable.draw();
    });
  }
}
