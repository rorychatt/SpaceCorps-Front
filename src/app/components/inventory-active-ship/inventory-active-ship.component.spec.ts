import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryActiveShipComponent } from './inventory-active-ship.component';

describe('InventoryActiveShipComponent', () => {
  let component: InventoryActiveShipComponent;
  let fixture: ComponentFixture<InventoryActiveShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryActiveShipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryActiveShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
