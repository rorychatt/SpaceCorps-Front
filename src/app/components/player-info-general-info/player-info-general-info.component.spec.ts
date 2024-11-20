import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInfoGeneralInfoComponent } from './player-info-general-info.component';

describe('PlayerInfoGeneralInfoComponent', () => {
  let component: PlayerInfoGeneralInfoComponent;
  let fixture: ComponentFixture<PlayerInfoGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerInfoGeneralInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerInfoGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
