import {Component} from '@angular/core';
import {
  PlayerInfoGeneralInfoComponent
} from '../components/player-info-general-info/player-info-general-info.component';
import {PlayerInfoStatisticsComponent} from "../components/player-info-statistics/player-info-statistics.component";
import {ThemePickerComponent} from '../components/theme-picker/theme-picker.component';

@Component({
  selector: 'app-pilot-info',
  imports: [
    PlayerInfoGeneralInfoComponent,
    PlayerInfoStatisticsComponent,
    ThemePickerComponent
  ],
  templateUrl: './pilot-info.component.html',
  styleUrl: './pilot-info.component.scss'
})
export class PilotInfoComponent {

}
