import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { LicenseKey, User, Admin, Stuff, Student, HistoryItem, Group, Program, Result } from '../models/main.model';

@Injectable()
export class ActionService {
    baseUrl: string;
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    generateKey(company: string){
        return this.http.get(this.baseUrl +
            `api/Action/GenerateKey?company=${company}`)
        .map(r => Number(r.json().error));
    }

    addProgram(name: string, idLicenseKey: number, company: string){
        return this.http.get(this.baseUrl + 
            `api/Action/AddProgram?name=${name}&idLicenseKey=${idLicenseKey}&company=${company}`)
        .map(r => Number(r.json().error));
    }

    addAdmin(company: string, fio: string, login: string, password: string, isSA: boolean): Observable<number> {
        return this.http.get(this.baseUrl + 
            `api/Action/AddAdmin?company=${company}&fio=${fio}&login=${login}&password=${password}&isSA=${isSA ? 1 : 0}`)
        .map(r => Number(r.json().error));
    }

    addStuff(company: string, fio: string, login: string, password: string, position: string): Observable<number> {
        return this.http.get(this.baseUrl + 
            `api/Action/AddStuff?company=${company}&fio=${fio}&login=${login}&password=${password}&position=${position ? 1 : 0}`)
        .map(r => Number(r.json().error));
    }

    addStudent(company: string, fio: string, login: string, password: string, idGroup: number): Observable<number> {
        return this.http.get(this.baseUrl + 
            `api/Action/AddStudent?company=${company}&fio=${fio}&login=${login}&password=${password}&idGroup=${idGroup}`)
        .map(r => Number(r.json().error));
    }

    addBlockAsDescendant(idParent: string, parentType: string, name: string, company: string): Observable<number>{
        return this.http.get(this.baseUrl +
            `api/Action/AddBlockAsDescendant?idParent=${idParent}&parentType=${parentType}&name=${name}&company=${company}`)
        .map(r => Number(r.json().error));
    }

    addExersizeAsDescendant(idParent: string, parentType: string, name: string, generalQuestion: string, company: string): Observable<number> {
        return this.http.get(this.baseUrl +
            `api/Action/AddExersizeAsDescendant?idParent=${idParent}&parentType=${parentType}&name=${name}&generalQuestion=${generalQuestion}&company=${company}`)
        .map(r => Number(r.json().error));
    }

    addQuestionAsDescendant(idParent: string, parentType: string, content: string, company: string): Observable<number>{
        return this.http.get(this.baseUrl +
            `api/Action/AddQuestionAsDescendant?idParent=${idParent}&parentType=${parentType}&content=${content}&company=${company}`)
        .map(r => Number(r.json().error));
    }

    addConclusionAsDescendant(idParent: string, parentType: string, name: string, company: string): Observable<number>{
        return this.http.get(this.baseUrl +
            `api/Action/AddConclusionAsDescendant?idParent=${idParent}&parentType=${parentType}&name=${name}&company=${company}`)
        .map(r => Number(r.json().error));
    }

    addResolverAsDescendant(idParent: string, parentType: string, type: number, content: string, company: string): Observable<number>{
        return this.http.get(this.baseUrl +
            `api/Action/AddResolverAsDescendant?idParent=${idParent}&parentType=${parentType}&type=${type}&content=${content}&company=${company}`)
        .map(r => Number(r.json().error));
    }

    addVideoAsDescendant(idParent: string, parentType: string, content1: string, content2: string, isFirstCorrect: boolean, playbackType: number, company: string): Observable<number> {
        return this.http.get(this.baseUrl +
            `api/Action/AddVideoAsDescendant?idParent=${idParent}&parentType=${parentType}&content1=${content1}&content2=${content2}&isFirstCorrect=${isFirstCorrect ? 1 : 0}&playbackType=${playbackType}&company=${company}`)
        .map(r => Number(r.json().error));
    }

    editUser(id: number, company: string, fio: string, login: string, password: string): Observable<number> {
        return this.http.get(this.baseUrl + 
            `api/Action/EditUser?id=${id}&company=${company}&fio=${fio}&login=${login}&password=${password}`)
        .map(r => Number(r.json().error));
    }

    assignSA(id: number, company: string): Observable<number> {
        return this.http.get(this.baseUrl + 
            `api/Action/AssignSA?id=${id}&company=${company}`)
        .map(r => { console.log(r); return Number(r.json().error); });
    }

    editPosition(id: number, company: string, position: string): Observable<number> {
        return this.http.get(this.baseUrl + 
            `api/Action/EditPosition?id=${id}&company=${company}&position=${position}`)
        .map(r => Number(r.json().error));
    }

    editGroup(id: number, company: string, idGroup: number): Observable<number> {
        return this.http.get(this.baseUrl + 
            `api/Action/EditGroup?id=${id}&company=${company}&idGroup=${idGroup}`)
        .map(r => Number(r.json().error));
    }

    deleteUser(id: number, company: string){
        return this.http.get(this.baseUrl + 
            `api/Action/DeleteUser?id=${id}&company=${company}`)
        .map(r => Number(r.json().error));
    }

    deleteGroup(id: number, company: string){
        return this.http.get(this.baseUrl + 
            `api/Action/DeleteGroup?id=${id}&company=${company}`)
        .map(r => Number(r.json().error));
    }
}