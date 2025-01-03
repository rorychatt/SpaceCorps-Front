import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { UserCredentialsLoginRequest } from '../../models/auth/UserCredentialsLoginRequest';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  toggleViewEvent = output<void>();
  toggleLoginEvent = output<UserCredentialsLoginRequest>();

  toggleView() {
    this.toggleViewEvent.emit();
  }

  handleLogin() {
    const userCredentialsLoginRequest: UserCredentialsLoginRequest = {
      email: this.loginForm.get('email')!.value!,
      password: this.loginForm.get('password')!.value!,
    };
    this.toggleLoginEvent.emit(userCredentialsLoginRequest);
  }

}
