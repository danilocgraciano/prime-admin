import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu: Array<any> = [
    { title: 'Usuários', icon: '', selected: false, url: 'usuario' },
    { title: 'Simple Table', icon: '', selected: false, url: 'simpleTable' },
    { title: 'Pivot Table', icon: '', selected: false, url: 'pivotTable' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
