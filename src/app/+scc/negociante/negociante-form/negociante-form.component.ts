import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Negociante } from '../negociante';
import { NegocianteService } from '../negociante.service';
import { InfoDialogComponent } from '../../../shared/dialog/info-dialog/info-dialog.component';
import { LocaleSettings } from 'primeng/calendar';

@Component({
  selector: 'app-negociante-form',
  templateUrl: './negociante-form.component.html',
  styleUrls: ['./negociante-form.component.css']
})
export class NegocianteFormComponent implements OnInit {

  url: string = '/negociante/';
  negociante: Negociante = new Negociante();
  form: FormGroup;
  title: string = 'Cadastro de Negociante';
  mode: string;
  ptBR: any;

  tipoNegociante: Array<any> = [
    {
      id: 0, descricao: 'Física',
    },
    {
      id: 1, descricao: 'Jurídica',
    },
    {
      id: 2, descricao: 'Exterior',
    },
    {
      id: 3, descricao: 'Outros',
    },
  ];

  tipoRegimeTributacao: Array<any> = [
    {
      id: 0, descricao: 'Simples Nacional',
    },
    {
      id: 1, descricao: 'Lucro Presumido',
    },
    {
      id: 2, descricao: 'Lucro Real',
    },
    {
      id: 3, descricao: 'Outros',
    },
  ];

  listSimNao: Array<any> = [
    {
      id: true, descricao: 'Sim',
    },
    {
      id: false, descricao: 'Não',
    }
  ];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private service: NegocianteService, private modalService: BsModalService) {
  }

  ngOnInit() {


    this.ptBR = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Quar", "Qui", "Sex", "Sáb"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      today: 'Hoje',
      clear: 'Limpar'
    };
    this.form = this.formBuilder.group({
      id: ['', []],
      codigo: ['', []],
      nome: ['', [
        Validators.required
      ]],
      tipoNegociante: ['', Validators.required],
      cpfCnpj: ['', []],
      inscricaoEstadual: ['', []],
      rg: ['', []],
      suframa: ['', []],
      contribuinteIcms: ['', [Validators.required]],
      caixaPostal: ['', []],
      email: ['', [Validators.email]],
      homePage: ['', []],
      observacao: ['', []],
      tipoRegimeTributacao: ['', [Validators.required]],
      nomeFantasia: ['', []],
      inativo: ['', []],
      sexo: ['', []],
      dataNascimento: ['', []]
    });

    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.mode = id ? ' (Edição)' : ' (Novo)';

      if (!id)
        return;

      this.service.readById(id).subscribe(resp => {
        if (!resp['success']) {
          const initialState = {
            message: resp['msg'],
            title: 'Erro'
          };
          this.modalService.show(InfoDialogComponent, {
            initialState
          });
        } else {
          this.negociante = resp['data'];
        }
      });

    });
  }

  onSubmit() {
    if (this.form.valid) {
      var result;
      var id = this.form.value.id;
      if (id) {
        result = this.service.update(this.negociante);
      } else {
        result = this.service.create(this.negociante);
      }
      result.subscribe((resp) => {


        const initialState = {
          message: resp['msg'],
          title: (resp['success'] === true) ? 'Atenção' : 'Erro'
        };

        this.modalService.onHidden.subscribe((reason: string) => {

          if (resp['success'] === true) {
            this.router.navigate([this.url]);
          }
        });

        this.modalService.show(InfoDialogComponent, {
          initialState
        });

      });
    }
  }

}
