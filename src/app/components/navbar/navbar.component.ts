import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { MainMenuComponent } from "../main-menu/main-menu.component";
import { LoginAsAdminBtnComponent } from '../login-as-admin-btn/login-as-admin-btn.component';
import { UserCredentialsLoginRequest } from '../../models/auth/UserCredentialsLoginRequest';

@Component({
    selector: 'app-navbar',
    imports: [
        RouterLink,
        AsyncPipe,
        MainMenuComponent,
        LoginAsAdminBtnComponent
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  authService = inject(AuthService)
  authState$ = this.authService.authState$;

  logOut() {
    this.authService.logOut();
  }

  toggleLogin ($event: UserCredentialsLoginRequest) {
    this.authService.logIn($event).subscribe({
      next: (response) => {
        this.authService.fetchUserAfterSuccessfulLogin(response);
      },
      error: (err) => {
        throw err;
      }
    })
  }
}
