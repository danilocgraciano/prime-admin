import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu: Array<any> = [
    { title: 'Dashboard', icon: 'home', selected: true, url: 'home' },
    { title: 'Orders', icon: 'file', selected: false, url: 'orders' },
    { title: 'Products', icon: 'shopping-cart', selected: false, url: 'products' },
    { title: 'Reports', icon: 'bar-chart-2', selected: false, url: 'reports' },
    { title: 'Integrations', icon: 'layers', selected: false, url: 'integrations' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
