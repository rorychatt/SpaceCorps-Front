import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in', () => {
    service.logIn();
    service.authState$.subscribe(state => {
      expect(state.isLoggedIn).toBeTrue();
    });
  });

  it('should log out', () => {
    service.logOut();
    service.authState$.subscribe(state => {
      expect(state.isLoggedIn).toBeFalse();
    });
  });
});
