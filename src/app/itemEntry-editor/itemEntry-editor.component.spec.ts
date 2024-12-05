import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEntryEditorComponent } from './itemEntry-editor.component';

describe('ItemEditorComponent', () => {
  let component: ItemEntryEditorComponent;
  let fixture: ComponentFixture<ItemEntryEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemEntryEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemEntryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
