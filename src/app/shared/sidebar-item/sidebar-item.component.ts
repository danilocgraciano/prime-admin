import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
declare var $;

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.css']
})
export class SidebarItemComponent implements OnInit {

  @Input() items: any;
  @Input() toggleId: any;

  constructor(private router: Router) { }

  ngOnInit() {

    $(document).ready(function () {
      $('.nav-link').on('click', function () {

        let width = $(window).width();
        if (width < 768) { //@media (max-width: 768px)

          let sidebar = $('.sidebar');
          sidebar.removeClass('show');
          sidebar.css({ "margin-left": "-225px" });

        }
      });
    });
  }

  onClick(event, item) {
    event.preventDefault();
    this.router.navigate([item.url]);
  }

  isActive(item): boolean {
    if (this.router.url.replace("/", "").startsWith(item.url) && item.leaf)
      return true;
    return false;
  }

}
