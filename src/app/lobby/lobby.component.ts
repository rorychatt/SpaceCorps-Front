import { Component, inject } from '@angular/core';
import { MainMenuComponent } from '../components/main-menu/main-menu.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-lobby',
    imports: [
        MainMenuComponent
    ],
    templateUrl: './lobby.component.html',
    styleUrl: './lobby.component.scss'
})
export class LobbyComponent {

  authService = inject(AuthService);

  constructor (private router: Router) {
  }

  openGame (): void {
    const playerData = this.authService.getPlayerData();
    if (!playerData) {
      console.error('No username found');
    } else {
      const userName = playerData!.username;
      const url = `/game?userName=${userName}`;
      void window.open(url, '_blank');
    }
  }
}
