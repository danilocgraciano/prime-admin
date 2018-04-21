/**
 * Adaptado de https://hackernoon.com/create-reuseable-validation-directive-in-angualr-2-dcb0b0df2ce8
 */
import { Directive, OnInit, OnDestroy, Input, ElementRef, Renderer2 } from "@angular/core";
import { AbstractControl, ControlContainer, FormGroupDirective } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';

@Directive({
    selector: '[myFormGroup]'
})
export class MyFormGroupDirective implements OnInit, OnDestroy {
    @Input() myFormGroup: string;
    control: AbstractControl;
    hasView = false;
    controlValue$: Observable<any>;
    controlSubscription: Subscription;
    hasSubmitted: boolean;
    constructor(private _fg: ControlContainer, private _el: ElementRef, private render: Renderer2) { }

    ngOnInit() {

        this.render.addClass(this._el.nativeElement, 'form-group');

        this.control = this.form.get(this.myFormGroup);
        let formSubmit$ = (<FormGroupDirective>this._fg).ngSubmit.map(() => {
            this.hasSubmitted = true;
        });
        this.controlValue$ = Observable.merge(this.control.valueChanges, Observable.of(''), formSubmit$);
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