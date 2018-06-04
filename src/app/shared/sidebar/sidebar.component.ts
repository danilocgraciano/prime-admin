import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu: Array<any> = [
    {
      id: 0,
      label: 'Controle de Cadastros',
      leaf: false,
      items: [
        { id: 1, label: 'Negociantes', icon: 'oi oi-person', disabled: false, url: 'negociante', leaf: true },
        { id: 2, label: 'CEP', icon: 'oi oi-chevron-right', disabled: false, url: 'cep', leaf: true },
        { id: 3, label: 'Município', icon: 'oi oi-chevron-right', disabled: false, url: 'municipio', leaf: true },
        { id: 4, label: 'UF', icon: 'oi oi-chevron-right', disabled: false, url: 'uf', leaf: true },
        { id: 5, label: 'País', icon: 'oi oi-chevron-right', disabled: false, url: 'pais', leaf: true },
      ]
    },
    {
      id: 6,
      label: 'Controle de Ambiente',
      leaf: false,
      items: [
        { id: 7, label: 'Usuários', icon: 'oi oi-people', disabled: false, url: 'usuario', leaf: true },
      ]
    },
    {
      id: 8,
      label: 'Outros',
      leaf: false,
      items: [
        {
          id: 9, label: 'Simple Table', icon: 'oi oi-chevron-right', disabled: false, url: 'simpleTable', leaf: true
        }
      ]
    }


  ]

  constructor() { }

  ngOnInit() {

    $(document).on("mousemove", function (event) {
      if (!$(".sidebar.show")[0]) {
        if (event.pageX < 30 && event.pageY > 40) {
          $('.sidebar').css({ "margin-left": "0px" });
        } else {
          if (event.pageX > 225) {
            $('.sidebar').css({ "margin-left": "-225px" });
          }
        }
      }
    });
  }

}
