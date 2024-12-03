import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInfoStatisticsComponent } from './player-info-statistics.component';

describe('PlayerInfoStatisticsComponent', () => {
  let component: PlayerInfoStatisticsComponent;
  let fixture: ComponentFixture<PlayerInfoStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerInfoStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerInfoStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
