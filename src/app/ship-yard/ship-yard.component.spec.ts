import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipYardComponent } from './ship-yard.component';

describe('ShipYardComponent', () => {
  let component: ShipYardComponent;
  let fixture: ComponentFixture<ShipYardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipYardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipYardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
