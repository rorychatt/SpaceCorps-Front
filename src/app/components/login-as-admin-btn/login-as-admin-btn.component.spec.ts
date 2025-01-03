import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAsAdminBtnComponent } from './login-as-admin-btn.component';

describe('LoginAsAdminBtnComponent', () => {
  let component: LoginAsAdminBtnComponent;
  let fixture: ComponentFixture<LoginAsAdminBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAsAdminBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAsAdminBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
