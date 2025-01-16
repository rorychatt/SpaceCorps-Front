import { Component } from '@angular/core';
import {
  PlayerInfoGeneralInfoComponent
} from '../components/player-info-general-info/player-info-general-info.component';
import { PlayerInfoStatisticsComponent } from "../components/player-info-statistics/player-info-statistics.component";

@Component({
    selector: 'app-pilot-info',
    imports: [
        PlayerInfoGeneralInfoComponent,
        PlayerInfoStatisticsComponent
    ],
    templateUrl: './pilot-info.component.html',
    styleUrl: './pilot-info.component.scss'
})
export class PilotInfoComponent {

}
