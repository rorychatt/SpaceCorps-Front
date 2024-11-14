import { Component } from '@angular/core';
import { MainMenuComponent } from '../components/main-menu/main-menu.component';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [
    MainMenuComponent
  ],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent {
  openGame(): void {
    window.open('/game', '_blank');
  }
}
