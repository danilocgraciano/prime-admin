/**
 * Adaptado de https://hackernoon.com/create-reuseable-validation-directive-in-angualr-2-dcb0b0df2ce8
 */
import { Directive, OnInit, OnDestroy, Input, ElementRef, Renderer2 } from "@angular/core";
import { AbstractControl, ControlContainer, FormGroupDirective } from "@angular/forms";
import { Subscription, Observable, merge, of } from "rxjs";
import { map } from "rxjs/operators";




@Directive({
    selector: '[myFormGroup]'
})
export class MyFormGroupDirective implements OnInit, OnDestroy {
    @Input() myFormGroup: string;
    @Input() required: boolean = false;
    control: AbstractControl;
    hasView = false;
    controlValue$: Observable<any>;
    controlSubscription: Subscription;
    hasSubmitted: boolean;
    constructor(private _fg: ControlContainer, private _el: ElementRef, private render: Renderer2) { }

    ngOnInit() {

        this.render.addClass(this._el.nativeElement, 'form-group');
        if (this.required) {
            this.render.addClass(this._el.nativeElement, 'required');
        }

        this.control = this.form.get(this.myFormGroup);
        let formSubmit$ = (<FormGroupDirective>this._fg).ngSubmit.pipe(map(() => {
            this.hasSubmitted = true;
        }));
        this.controlValue$ = merge(this.control.valueChanges, of(''), formSubmit$);
        this.controlSubscription = this.controlValue$.subscribe(() => {
            this.setClass();
        });

    }

    private setClass() {
        if (this.control.invalid && (this.control.dirty || this.hasSubmitted)) {
            this.render.addClass(this._el.nativeElement, 'has-error');
        } else {
            this.render.removeClass(this._el.nativeElement, 'has-error');
        }
    }

    match(error: string) {
        if (this.control && this.control.errors) {
            if (Object.keys(this.control.errors).indexOf(error) > -1) {
                return true;
            }
        }
        return false;
    }

    get form() { return this._fg.formDirective ? (this._fg.formDirective as FormGroupDirective).form : null; }

    ngOnDestroy() {
        this.controlSubscription.unsubscribe();
    }
}