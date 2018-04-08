export class DataTableSetup {

    searching: boolean = false;
    pageLength: number = 10;
    language: any = {
        "url": "../../assets/Portuguese-Brasil.json"
    };
    dom = 't<"d-flex justify-content-between"<"pagination pagination-sm"p>li>';
    buttons: Array<any>;

    processing: boolean = false;
    serverSide: boolean = false;
    ajax: string;
    columns: Array<any>;

    constructor(config?: any) {
        Object.assign(this, config);
        if (this.buttons != null) {
            this.dom = 'B' + this.dom;
            console.log(this.dom);
        }
    }

}