import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotInventoryComponent } from './pilot-inventory.component';

describe('PilotInventoryComponent', () => {
  let component: PilotInventoryComponent;
  let fixture: ComponentFixture<PilotInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilotInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PilotInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
