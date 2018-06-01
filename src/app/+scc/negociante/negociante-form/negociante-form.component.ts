import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Negociante } from '../negociante';
import { NegocianteService } from '../negociante.service';
import { InfoDialogComponent } from '../../../shared/dialog/info-dialog/info-dialog.component';
import { LocaleSettings } from 'primeng/calendar';
import { InputMask } from 'primeng/inputmask';
import { ValidateCNPJ } from '../../../shared/form-validation/cnpj.validator';
import { ValidateCPF } from '../../../shared/form-validation/cpf.validator';
import * as CalendarConfig from '../../../shared/calendar/calendar.config';

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
  locale: any;

  @ViewChild("txtCpf") txtCpf: InputMask;
  @ViewChild("txtCnpj") txtCnpj: InputMask;
  @ViewChild("txtOutrosExterior") txtOutrosExterior: ElementRef;

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

    this.form = this.formBuilder.group({
      id: ['', []],
      codigo: ['', []],
      nome: ['', [
        Validators.required
      ]],
      tipoNegociante: ['', Validators.required],
      inscricaoEstadual: ['', []],
      inscricaoMunicipal: ['', []],
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
      dataNascimento: ['', []],
      _cpf: ['', [ValidateCPF]],
      _cnpj: ['', [ValidateCNPJ]],
      _extOut: ['', []]
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
          this.refresh(this.negociante);
        }
      });

    });

    this.locale = CalendarConfig.locale;
  }

  refresh(negociante) {

    if (negociante.tipoNegociante == 0)//FISICA
      negociante._cpf = negociante.cpfCnpj;

    if (negociante.tipoNegociante == 1)//JURIDICA
      negociante._cnpj = negociante.cpfCnpj;

    if (negociante.tipoNegociante == 2 || negociante.tipoNegociante == 3)//EXTERIOR / OUTROS
      negociante._extOut = negociante.cpfCnpj;
  }

  flush() {

    if (this.negociante.tipoNegociante == 0)
      this.negociante.cpfCnpj = this.txtCpf.value;

    if (this.negociante.tipoNegociante == 1)
      this.negociante.cpfCnpj = this.txtCnpj.value;

    if (this.negociante.tipoNegociante == 2 || this.negociante.tipoNegociante == 3)
      this.negociante.cpfCnpj = this.txtOutrosExterior.nativeElement.value;
  }

  onSubmit() {
    this.flush();

    let isValid: boolean = true;

    if (this.negociante.tipoNegociante != 2 && this.negociante.tipoNegociante != 3) {
      if (this.negociante.cpfCnpj == null || this.negociante.cpfCnpj == '') {

        isValid = false;

        const initialState = {
          message: 'CPF/CNPJ é um dado obrigatório',
          title: 'Erro'
        };

        this.modalService.show(InfoDialogComponent, {
          initialState
        });

      }
    }

    let nEndPag = 0, nEndEnt = 0, nEndPrin = 0;

    this.negociante.enderecos.forEach((endereco) => {
      if (endereco.tipoEndereco == 0)
        nEndPrin++
      if (endereco.tipoEndereco == 1)
        nEndPag++
      if (endereco.tipoEndereco == 2)
        nEndEnt++
    });

    if (nEndPrin == 0 && nEndPag == 0 && nEndEnt == 0 && (this.negociante.tipoNegociante != 2 && this.negociante.tipoNegociante != 3)) {
      isValid = false;

      const initialState = {
        message: 'Endereço é um dado obrigatório',
        title: 'Erro'
      };

      this.modalService.show(InfoDialogComponent, {
        initialState
      });
    }

    if (isValid && nEndPrin > 1) {
      isValid = false;

      const initialState = {
        message: 'Selecione apenas 1 endereço do tipo principal',
        title: 'Erro'
      };

      this.modalService.show(InfoDialogComponent, {
        initialState
      });
    }

    if (isValid && nEndPag > 1) {
      isValid = false;

      const initialState = {
        message: 'Selecione apenas 1 endereço do tipo pagamento',
        title: 'Erro'
      };

      this.modalService.show(InfoDialogComponent, {
        initialState
      });
    }

    if (isValid && nEndEnt > 1) {
      isValid = false;

      const initialState = {
        message: 'Selecione apenas 1 endereço do tipo entrega',
        title: 'Erro'
      };

      this.modalService.show(InfoDialogComponent, {
        initialState
      });
    }

    if (this.form.valid && isValid) {
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

  onChangeTiponegociante(value) {
    if (value.id != 0) {
      this.negociante.dataNascimento = null;
      this.negociante.sexo = null;
    }
  }

}
