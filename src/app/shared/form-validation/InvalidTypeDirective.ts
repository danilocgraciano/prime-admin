/**
 * Adaptado de https://hackernoon.com/create-reuseable-validation-directive-in-angualr-2-dcb0b0df2ce8
 */
import { Directive, OnInit, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { MyFormGroupDirective } from "./MyFormGroupDirective";

@Directive({
    selector: '[invalidType]'
})
export class InvalidTypeDirective implements OnInit {
    @Input('invalidType') type: string;
    private hasView = false;
    constructor(
        private myFormGroupDirective: MyFormGroupDirective,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) { }
    ngOnInit() {
        this.myFormGroupDirective.controlValue$.subscribe(() => {
            this.setVisible();
        });
    }

    private setVisible() {
        if (this.myFormGroupDirective.match(this.type)) {
            if (!this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.hasView = true;
            }
        } else {
            if (this.hasView) {
                this.viewContainer.clear();
                this.hasView = false;
            }
        }
    }
}