import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AuthService } from "../auth.service";
import { InfoDialogComponent } from '../../dialog/info-dialog/info-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  bsModalRef: BsModalRef;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, Validators.required],
    });
  }

  onSubmit(): void {

    if (this.form.valid) {
      this.authService.login(this.form.value)
        .subscribe(resp => {
          if (resp['success']) {
            this.authService.redirectAferLogin();
          } else {

            const initialState = {
              message: resp['msg'],
              title: 'Atenção'
            };
            this.bsModalRef = this.modalService.show(InfoDialogComponent, {
              initialState
            });
          }
        });
    }

  }

}
