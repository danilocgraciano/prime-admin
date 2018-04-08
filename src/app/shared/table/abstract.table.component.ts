import { Component, OnInit } from '@angular/core';
declare var $;

export abstract class AbstractTableComponent {

    init(selector: string, config: any) {
        $(document).ready(function () {
            $('#' + selector).DataTable(config);
        });
    }

}