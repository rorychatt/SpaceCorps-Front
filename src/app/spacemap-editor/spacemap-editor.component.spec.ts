import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacemapEditorComponent } from './spacemap-editor.component';

describe('SpacemapEditorComponent', () => {
  let component: SpacemapEditorComponent;
  let fixture: ComponentFixture<SpacemapEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpacemapEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacemapEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
