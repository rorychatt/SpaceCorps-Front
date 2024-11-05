import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { RegisterFormComponent } from '../components/register-form/register-form.component';
import { AuthService } from '../services/auth.service';
import { UserCredentialsCreateRequest } from '../models/auth/UserCredentialsCreateRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  isLoginView = true;

  onToggleView () {
    this.isLoginView = !this.isLoginView;
  }

  onRegister ($event: UserCredentialsCreateRequest) {
    const result = this.authService.register($event);

  }
}
