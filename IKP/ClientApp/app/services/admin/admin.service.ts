import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { LicenseKey, User, Admin, Stuff, Student, HistoryItem, Group, Program, Result } from '../models/main.model';

@Injectable()
export class AdminService {
    baseUrl: string;
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    getLicenseKeys(company: string): Observable<LicenseKey[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/LicenseKeys?company=' + company)
        .map(r => r.json() as LicenseKey[]);
    }

    getAdmins(company: string): Observable<Admin[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/Admins?company=' + company)
        .map(r => r.json() as Admin[]);
    }

    getStuff(company: string): Observable<Stuff[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/Stuff?company=' + company)
        .map(r => r.json() as Stuff[]);
    }

    getGroups(company: string): Observable<Group[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/Groups?company=' + company)
        .map(r => r.json() as Group[]);
    }

    getStudents(company: string): Observable<Student[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/Students?company=' + company)
        .map(r => r.json() as Student[]);
    }

    getHistory(company: string, from: Date, to: Date): Observable<HistoryItem[]> {
        return this.http.get(this.baseUrl + `api/AdminService/History?company=${company}&from=${from.toISOString()}&to=${to.toISOString()}`)
        .map(r => r.json() as HistoryItem[]);
    }

    getMyGroups(user: User): Observable<Group[]> {
        return this.http.get(this.baseUrl + `api/AdminService/Groups?company=${user.Company}&lead_id=${user.ID}`)
        .map(r => r.json() as Group[]);
    }

    getAllResults(company: string): Observable<Result[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/Results?company=' + company)
        .map(r => r.json() as Result[]);
    }

    getPrograms(company: string): Observable<Program[]> {
        return this.http.get(this.baseUrl + 'api/AdminService/Programs?company=' + company)
        .map(r => r.json() as Program[]);
    }

    getMyResults(user: User): Observable<Result[]> {
        return this.http.get(this.baseUrl + `api/AdminService/Results?company=${user.Company}&stud_id=${user.ID}`)
        .map(r => r.json() as Result[]);
    }

    getDescendants(id: number, parentType: number, childrenType: number, company: string): Observable<any>{
        return this.http.get(this.baseUrl + `api/AdminService/Descendants?id=${id}&parentType=${parentType}&type=${childrenType}&company=${company}`)
        .map(r => r.json());
    }
}