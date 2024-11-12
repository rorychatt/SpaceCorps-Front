import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { RegisterFormComponent } from '../components/register-form/register-form.component';
import { AuthService } from '../services/auth.service';
import { UserCredentialsCreateRequest } from '../models/auth/UserCredentialsCreateRequest';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { UserCredentialsLoginRequest } from '../models/auth/UserCredentialsLoginRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginFormComponent,
    RegisterFormComponent,
    ErrorModalComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  isLoginView = true;
  error: HttpErrorResponse | null = null;
  router = inject(Router);

  clearLoginError () {
    this.error = null;
  }

  onToggleView () {
    this.isLoginView = !this.isLoginView;
    this.clearLoginError();
  }

  onRegister ($event: UserCredentialsCreateRequest) {
    const result = this.authService.register($event);
    result.subscribe({
      next: (response) => {
        this.onToggleView();
      },
      error: (err: HttpErrorResponse) => {
        this.error = err;
        console.log(err);
      }
    });
  }

  onLogin ($event: UserCredentialsLoginRequest) {
    const result = this.authService.logIn($event);
    result.subscribe({
      next: (response) => {
        this.clearLoginError();
        console.log({ ...response, isLoggedIn: true });
        this.authService.patchState({ ...response, isLoggedIn: true });
        void this.router.navigate(['lobby']);
      },
      error: (err: HttpErrorResponse) => {
        this.error = err;
        console.log(err);
      }
    });
  }
}
