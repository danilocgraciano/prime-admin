import { Component, OnInit } from '@angular/core';
declare var $;

export class AbstractTableComponent {

    static this: any;
    myTable: any;

    constructor() {
        AbstractTableComponent.this = this;
    }

    init(selector: string, config: any) {
        $(document).ready(function () {

            Object.assign(config, {
                "initComplete": function (settings, json) {
                    AbstractTableComponent.this.myTable = table;
                }
            });

            var table = $('#' + selector).DataTable(config);

            table.on('click', 'tr', function () {

                if ($(this).hasClass('table-primary')) {
                    $(this).removeClass('table-primary');
                } else {
                    table.$('tr.table-primary').removeClass('table-primary');
                    $(this).addClass('table-primary');
                }
            });

        });
    }

    getSelection() {
        return AbstractTableComponent.this.myTable.row('.table-primary').data();
    }

    removeSelection() {
        AbstractTableComponent.this.myTable.row('.table-primary').remove().draw(false);
    }

}