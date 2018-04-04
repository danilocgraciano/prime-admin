import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  
    constructor(private formBuilder: FormBuilder, ) {
  
    }
  
    ngOnInit(): void {
      this.formulario = this.formBuilder.group({
        email: [null, [Validators.required, Validators.email]],
        senha: [null, Validators.required],
      });
    }
  
    onSubmit(): void {
  
      if (this.formulario.valid) {
        console.log(this.formulario.value);
      }
  
    }

}
