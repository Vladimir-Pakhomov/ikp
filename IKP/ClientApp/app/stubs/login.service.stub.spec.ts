import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../services/models/main.model';
import { AdminsStub } from './admin.service.stub.spec';
import { StuffStub, StudentsStub } from './students.stub.spec';

@Injectable()
export class LoginServiceStub {
    login(company: string, login: string, password: string): Observable<User|null> {
        let array: User[] = [];
        let user = array.concat(AdminsStub).concat(StuffStub).concat(StudentsStub)
            .find(u => u.Login == login && u.Password == password);
        return Observable.of(user || null);
    }
}