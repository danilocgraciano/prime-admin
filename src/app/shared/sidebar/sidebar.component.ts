import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu: Array<any> = [
    { title: 'Simple Table', icon: '', selected: true, url: 'simpleTable' },
    { title: 'Rest Table', icon: '', selected: false, url: 'restTable' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
