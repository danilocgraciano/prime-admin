import { Component, OnInit, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
declare var $;

export class AbstractTableComponent {

    static this: any;
    myTable: any;
    onDblclick = new EventEmitter();

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
            table.on('dblclick', 'tr', function () {
                var data = table.row( this ).data();
                AbstractTableComponent.this.onDblclick.emit(data);
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