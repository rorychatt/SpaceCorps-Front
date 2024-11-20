import { Component } from '@angular/core';
import {
  PlayerInfoGeneralInfoComponent
} from '../components/player-info-general-info/player-info-general-info.component';

@Component({
  selector: 'app-pilot-info',
  standalone: true,
  imports: [
    PlayerInfoGeneralInfoComponent
  ],
  templateUrl: './pilot-info.component.html',
  styleUrl: './pilot-info.component.scss'
})
export class PilotInfoComponent {

}
