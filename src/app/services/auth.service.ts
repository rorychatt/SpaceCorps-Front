import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AuthState } from '../models/authState';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ComponentStore<AuthState>{

  constructor() {
    super({
      isLoggedIn: false
  })
  }

  readonly isLoggedIn$ = this.select((state) => state.isLoggedIn);

  logIn() {
    this.patchState({ isLoggedIn: true });
  }

  logOut() {
    this.patchState({ isLoggedIn: false });
  }

}
