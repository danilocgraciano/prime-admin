import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu: Array<any> = [
    { title: 'Usuários', icon: 'oi oi-people', selected: false, url: 'usuario' },
    { title: 'Negociantes', icon: 'oi oi-person', selected: false, url: 'negociante' },
    { title: 'CEP', icon: 'oi oi-chevron-right', selected: false, url: 'cep' },
    { title: 'Município', icon: 'oi oi-chevron-right', selected: false, url: 'municipio' },
    { title: 'UF', icon: 'oi oi-chevron-right', selected: false, url: 'uf' },
    { title: 'País', icon: 'oi oi-chevron-right', selected: false, url: 'pais' },
    { title: 'Simple Table', icon: 'oi oi-chevron-right', selected: false, url: 'simpleTable' },
    { title: 'Pivot Table', icon: 'oi oi-chevron-right', selected: false, url: 'pivotTable' }
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
