import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.css']
})
export class SidebarItemComponent implements OnInit {

  @Input() menuItem: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick(event) {
    event.preventDefault();
    this.router.navigate([this.menuItem.url]);
  }

  isActive(): boolean {
    if (this.router.url.replace("/", "") === this.menuItem.url)
      return true;
    return false;
  }

}
