import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AuthState } from '../models/auth/AuthState';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ComponentStore<AuthState> {

  constructor () {
    super(new AuthState());
  }

  readonly authState$ = this.select((state) => state);

  logIn () {
    this.patchState({ isLoggedIn: true });
  }

  logOut () {
    this.patchState(new AuthState());
  }

}
