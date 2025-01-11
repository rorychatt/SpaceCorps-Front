import { Component, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { UserCredentialsCreateRequest } from '../../models/auth/UserCredentialsCreateRequest';

@Component({
    selector: 'app-register-form',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgClass
    ],
    templateUrl: './register-form.component.html',
    styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  toggleViewEvent = output<void>();
  toggleRegisterEvent = output<UserCredentialsCreateRequest>();

  toggleView () {
    this.toggleViewEvent.emit();
  }

  handleRegister () {
    const userCredentialsCreateRequest: UserCredentialsCreateRequest = {
      username: this.registerForm.get('username')!.value!,
      email: this.registerForm.get('email')!.value!,
      password: this.registerForm.get('password')!.value!
    }
    this.toggleRegisterEvent.emit(userCredentialsCreateRequest);
  }
}
