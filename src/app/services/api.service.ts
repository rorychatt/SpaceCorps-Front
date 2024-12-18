import { Injectable } from '@angular/core';
import { UserCredentialsCreateRequest } from '../models/auth/UserCredentialsCreateRequest';
import { HttpClient } from '@angular/common/http';
import { UserCredentialsLoginRequest } from '../models/auth/UserCredentialsLoginRequest';
import { GetPlayerInfoRequest } from '../models/player/GetPlayerInfoRequest';
import { PlayerData } from '../models/player/PlayerData';
import { SpaceMapDataEntry } from '../models/dataEntries/SpaceMapDataEntry';
import { UpdateSpaceMapDataEntryRequest } from '../models/dataEntries/UpdateSpaceMapDataEntryRequest';
import { CreateStaticEntityRequest } from '../models/entity/CreateStaticEntityRequest';
import { DeleteStaticEntityRequest } from '../models/entity/DeleteStaticEntityRequest';
import { IItemEntry } from '../models/dataEntries/itemEntries/IItemEntry';
import { ServerInfo } from '../models/servers/ServerInfo';

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

  getPlayerInfo (request: GetPlayerInfoRequest) {
    return this.http.get<PlayerData>(`${this.url}/Players/get/${request.username}`);
  }

  getSpaceMapDataEntryNames () {
    return this.http.get<string[]>(`${this.url}/SpaceMapDataEntries/getAllNames`);
  }

  getSpaceMapDataEntry (name: string) {
    return this.http.get<SpaceMapDataEntry>(`${this.url}/SpaceMapDataEntries/get/${name}`);
  }

  postSpaceMapDataEntry (mapName: string) {
    return this.http.post<SpaceMapDataEntry>(`${this.url}/SpaceMapDataEntries/add`, { name: mapName });
  }

  updateSpaceMapDataEntry (mapName: string, request: UpdateSpaceMapDataEntryRequest) {
    return this.http.patch<SpaceMapDataEntry>(`${this.url}/SpaceMapDataEntries/update/${mapName}`, request);
  }

  deleteSpaceMapDataEntry (mapName: string) {
    return this.http.delete(`${this.url}/SpaceMapDataEntries/delete/${mapName}`);
  }

  addStaticEntityToMap (selectedSpaceMapDataEntryName: string, newStaticEntity: CreateStaticEntityRequest) {
    return this.http.post(`${this.url}/SpaceMapDataEntries/addStaticEntityToSpaceMap/${selectedSpaceMapDataEntryName}`, newStaticEntity);
  }

  deleteStaticEntityFromMap (mapName: string, staticEntity: DeleteStaticEntityRequest) {
    return this.http.delete(`${this.url}/SpaceMapDataEntries/deleteStaticEntityFromSpaceMap/${mapName}`, { body: staticEntity });
  }

  getItemEntriesByCategory (category: string) {
    return this.http.get(`${this.url}/ItemEntries/${category}`);
  }

  createNewItemEntry (category: string, newItem: IItemEntry) {
    return this.http.post<IItemEntry>(`${this.url}/ItemEntries/${category}/Add`, newItem);
  }

  deleteItemEntry (selectedCategory: string, item: IItemEntry) {
    return this.http.delete(`${this.url}/ItemEntries/${selectedCategory}/Delete`, { body: { id: item.id } });
  }

  getBackendVersion() {
    return this.http.get<ServerInfo>(`${this.url}/Servers/Info`);
  }
}
