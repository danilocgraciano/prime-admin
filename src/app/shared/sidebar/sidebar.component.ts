import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu: Array<any> = [
    { title: 'Usuários', icon: 'oi oi-people', selected: false, url: 'usuario' },
    { title: 'Negociantes', icon: 'oi oi-person', selected: false, url: 'negociante' },
    { title: 'Simple Table', icon: 'oi oi-chevron-right', selected: false, url: 'simpleTable' },
    { title: 'Pivot Table', icon: 'oi oi-chevron-right', selected: false, url: 'pivotTable' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
