import { Component, inject } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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

  authService = inject(AuthService);

  authState$ = this.authService.authState$;

  ngOnInit() {
    this.authState$.subscribe((state)=> {
      this.templateValues.username = state.username ?? this.templateValues.username;
    })
  }

  templateValues = {
    "username" : "undefined",
    "dateOfReg" : "undefined",
    "hoursPlayed" : 9999,
  }
}
