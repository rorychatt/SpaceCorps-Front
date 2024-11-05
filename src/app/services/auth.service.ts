import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AuthState } from '../models/auth/AuthState';
import { UserCredentialsCreateRequest } from '../models/auth/UserCredentialsCreateRequest';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ComponentStore<AuthState> {

  apiService = inject(ApiService);

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

  register (userCredentialsCreateRequest: UserCredentialsCreateRequest) {
    return this.apiService.createNewUser(userCredentialsCreateRequest);
  }

}
