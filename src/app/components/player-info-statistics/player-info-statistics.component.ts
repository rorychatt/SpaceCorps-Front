import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-player-info-statistics',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './player-info-statistics.component.html',
  styleUrl: './player-info-statistics.component.scss',
})
export class PlayerInfoStatisticsComponent {
  categories = [
    'Experience',
    'Honor',
    'Ships Destroyed',
    'Aliens Destroyed',
    'Ranking Points',
    'Completed Quests',
    'Completed Gates',
    'Current Title',
  ];
}
