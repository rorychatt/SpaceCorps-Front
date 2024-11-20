import { Component, inject } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-player-info-general-info',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe
  ],
  templateUrl: './player-info-general-info.component.html',
  styleUrl: './player-info-general-info.component.scss'
})
export class PlayerInfoGeneralInfoComponent {

  authService = inject(AuthService)

}
