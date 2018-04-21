/**
 * Adaptado de https://hackernoon.com/create-reuseable-validation-directive-in-angualr-2-dcb0b0df2ce8
 */
import { Directive, OnInit, Input, ElementRef, Renderer2 } from "@angular/core";
import { MyFormGroupDirective } from "./MyFormGroupDirective";

@Directive({
    selector: '[myFormControl]'
})
export class MyFormControlDirective implements OnInit {

    constructor(private myFormGroupDirective: MyFormGroupDirective, private _el: ElementRef, private render: Renderer2) { }
    ngOnInit() {

        this.render.addClass(this._el.nativeElement, 'form-control');

        this.myFormGroupDirective.controlValue$.subscribe(() => {
            this.setClass();
        });
    }

    private setClass() {
        if (this.myFormGroupDirective.control.invalid && (this.myFormGroupDirective.control.dirty || this.myFormGroupDirective.hasSubmitted)) {
            this.render.addClass(this._el.nativeElement, 'is-invalid');
        } else {
            this.render.removeClass(this._el.nativeElement, 'is-invalid');
        }
    }
}