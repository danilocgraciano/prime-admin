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
                "dom": 'Bt<"d-flex justify-content-between"<"pagination pagination-sm"p>li>',
                buttons: [
                    {
                        text: 'Novo',
                        action: function (e, dt, node, config) {
                            alert('Novo activated');
                        }
                    }, {
                        text: 'Editar',
                        action: function (e, dt, node, config) {
                            alert('Editar activated');
                        }
                    }, {
                        text: 'Excluir',
                        action: function (e, dt, node, config) {
                            alert('Excluir activated');
                        }
                    }, {
                        extend: 'excelHtml5',
                        exportOptions: {
                            columns: ':visible'
                        }
                    }, {
                        extend: 'pdfHtml5',
                        exportOptions: {
                            columns: ':visible'
                        }
                    },
                    {
                        extend: 'colvis',
                        text: 'Exibir'
                    }]
            });

        });
    }

}