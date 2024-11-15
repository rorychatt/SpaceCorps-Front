import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AuthState } from '../models/auth/AuthState';
import { UserCredentialsCreateRequest } from '../models/auth/UserCredentialsCreateRequest';
import { ApiService } from './api.service';
import { UserCredentialsLoginRequest } from '../models/auth/UserCredentialsLoginRequest';
import { GetPlayerInfoRequest } from '../models/player/GetPlayerInfoRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ComponentStore<AuthState> {

  apiService = inject(ApiService);

  constructor () {
    super(new AuthState());
  }

  readonly authState$ = this.select((state) => state);

  logIn (userCredentialsLoginRequest: UserCredentialsLoginRequest) {
    return this.apiService.logIn(userCredentialsLoginRequest);
  }

  logOut () {
    this.patchState(new AuthState());
  }

  register (userCredentialsCreateRequest: UserCredentialsCreateRequest) {
    return this.apiService.createNewUser(userCredentialsCreateRequest);
  }

  fetchUserAfterSuccessfulLogin (response: any) {

    const getPlayerInfoRequest: GetPlayerInfoRequest = {
      username: response.username
    }
    this.apiService.getPlayerInfo(getPlayerInfoRequest).subscribe({
      next: (response) => {
        this.patchState({
          isLoggedIn: true,
          username: response.userName,
          playerData: response
        });
        console.log(this.state());
      },
      error: (err) => {
        throw err;
      }
    });
  }

  getPlayerData(){
    return this.state().playerData;
  }
}
