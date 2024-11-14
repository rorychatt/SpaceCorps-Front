import { Injectable } from '@angular/core';
import { UserCredentialsCreateRequest } from '../models/auth/UserCredentialsCreateRequest';
import { HttpClient } from '@angular/common/http';
import { UserCredentialsLoginRequest } from '../models/auth/UserCredentialsLoginRequest';
import { GetPlayerInfoRequest } from '../models/player/GetPlayerInfoRequest';
import { PlayerData } from '../models/player/PlayerData';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost:5274/api';

  constructor (private http: HttpClient) {
  }

  createNewUser (request: UserCredentialsCreateRequest) {
    return this.http.post(`${this.url}/UserCredentials/create`, request);
  }

  logIn (request: UserCredentialsLoginRequest) {
    return this.http.post(`${this.url}/UserCredentials/verify`, request);
  }

  getPlayerInfo (request: GetPlayerInfoRequest){
    return this.http.get<PlayerData>(`${this.url}/Players/get/${request.username}`);
  }
}
