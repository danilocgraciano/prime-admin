import { Component, OnInit } from '@angular/core';
declare var $;

export abstract class AbstractTableComponent {

    init(selector: string = 'myTable', searching: boolean = false, pageLength: number = 10) {
        $(document).ready(function () {
            $('#' + selector).DataTable({
                "searching": searching,
                "pageLength": pageLength,
                "language": {
                    "url": "../../assets/Portuguese-Brasil.json"
                },
                "dom": 't<"d-flex justify-content-between"<"pagination pagination-sm"p>li>'
            });
        });
    }

}