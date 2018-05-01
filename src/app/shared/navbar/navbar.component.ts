import { Component, OnInit, Input } from '@angular/core';
declare var $;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() title: string = '';

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $('#menu').on('click', function () {

        let sidebar = $('.sidebar');
        sidebar.toggleClass('show');

        let isShowing: boolean = $(".sidebar.show")[0];
        if (isShowing) {
          if (sidebar.css('margin-left') != '0px') {
            sidebar.css({ "margin-left": "0px" });
          }
        }else{
          sidebar.css({ "margin-left": "-225px" });
        }

      });
    });
  }

}
