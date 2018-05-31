import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { LicenseKey, Db, User, Admin, Stuff, Student, HistoryItem, Group, Program, Result } from '../models/main.model';

@Injectable()
export class AdminService {
    baseUrl: string;
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    getLicenseKeys(): Observable<LicenseKey[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/LicenseKeys')
        .map(r => r.json() as LicenseKey[]);
    }

    getDatabases(): Observable<Db[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/Databases')
        .map(r => r.json() as Db[]);
    }

    getAdmins(): Observable<Admin[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/Admins')
        .map(r => r.json() as Admin[]);
    }

    getStuff(): Observable<Stuff[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/Stuff')
        .map(r => r.json() as Stuff[]);
    }

    getGroups(): Observable<Group[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/Groups')
        .map(r => r.json() as Group[]);
    }

    getStudents(): Observable<Student[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/Students')
        .map(r => r.json() as Student[]);
    }

    getHistory(from: Date, to: Date): Observable<HistoryItem[]> {
        return this.http.get(this.baseUrl + `api/AdminService/History?from=${from.toISOString()}&to=${to.toISOString()}`)
        .map(r => r.json() as HistoryItem[]);
    }

    getMyGroups(user: User): Observable<Group[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/Groups')
        .map(r => r.json() as Group[])
        .map(groups => groups.filter(g => g.Lead.Login == user.Login));
    }

    getAllResults(): Observable<Result[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/AllResults')
        .map(r => r.json() as Result[]);
    }

    getPrograms(): Observable<Program[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/Programs')
        .map(r => r.json() as Program[]);
    }

    getMyResults(user: User): Observable<Result[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/AllResults')
        .map(r => r.json() as Result[])
        .map(results => results.filter(r => r.User.Login == user.Login));
    }
}