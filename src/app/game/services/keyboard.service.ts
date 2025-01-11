import { Injectable } from '@angular/core';
import { HubService } from './hub.service';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {

  constructor(private hubService: HubService) {
    this.initializeKeyboardListeners();
  }

  private initializeKeyboardListeners(): void {
    window.addEventListener('keydown', (event) => this.handleKeyPress(event));
  }

  private handleKeyPress(event: KeyboardEvent): void {
    switch (event.key) {
      case 'o':
        this.logEntities();
        break;
      default:
        break;
    }
  }

  private logEntities(): void {
    this.hubService.send('logEntities');
  }
}
