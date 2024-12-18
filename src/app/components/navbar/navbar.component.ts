import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { MainMenuComponent } from "../main-menu/main-menu.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        RouterLink,
        AsyncPipe,
        MainMenuComponent
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
}
