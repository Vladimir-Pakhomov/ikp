import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../models/main.model';
import { PendingInterceptorService } from '../interceptors/pending-interceptor.service';

@Injectable()
export class LoginService {
    baseUrl: string;
    constructor(private http: PendingInterceptorService, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    login(company: string, login: string, password: string): Observable<User|null> {
        // TODO md5 пароль
        return this.http.get(this.baseUrl + `api/LoginService/Login?company=${company}&login=${login}&password=${password}`)
        .map(r => r.json()[0] as User);
    }
}