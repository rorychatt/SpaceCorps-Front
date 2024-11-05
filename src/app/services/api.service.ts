import { Injectable } from '@angular/core';
import { UserCredentialsCreateRequest } from '../models/auth/UserCredentialsCreateRequest';
import { HttpClient } from '@angular/common/http';

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


}
