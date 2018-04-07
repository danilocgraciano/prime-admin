import { Component, OnInit } from '@angular/core';
declare var $;

export abstract class AbstractRestTableComponent {

    init(selector: string = 'myTable', searching: boolean = false, pageLength: number = 10, url:string, columns:Array<any>) {
        $(document).ready(function () {
            $('#' + selector).DataTable({
                "searching": searching,
                "pageLength": pageLength,
                "language": {
                    "url": "../../assets/Portuguese-Brasil.json"
                },
                "dom": 't<"d-flex justify-content-between"<"pagination pagination-sm"p>li>',
                "processing": true,
                "serverSide": true,
                "ajax": url,
                "columns": columns
            });
        });
    }

}