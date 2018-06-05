import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../models/main.model';

@Injectable()
export class LoginService {
    baseUrl: string;
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    login(company: string, login: string, password: string): Observable<User|null> {
        // TODO md5 пароль
        return this.http.get(this.baseUrl + `api/LoginService/Login?company=${company}&login=${login}&password=${password}`)
        .map(r => r.json()[0] as User);
    }
}