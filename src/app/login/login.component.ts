import { Component } from '@angular/core';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { RegisterFormComponent } from '../components/register-form/register-form.component';

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
}
