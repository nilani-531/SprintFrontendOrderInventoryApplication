import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(5),this.noSpace]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  noSpace(control: AbstractControl): ValidationErrors | null {
    let value = control.value ;
    if (value && typeof value === 'string' && value.includes(' ')) {
      return { noSpaceError: true };
    }
    return null;
  }
  onSubmit() {
    
      console.log(this.loginForm.value);
      
    }
    
  }

