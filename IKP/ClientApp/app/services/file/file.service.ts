import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class FileService {

    _baseURL: string;
    constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
        this._baseURL = baseUrl;
    }

    upload(files: FormData, company: string){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return  this.http.post(this._baseURL + `api/FileService/Upload?company=${company}`, files)
                 .map(response => response.json())
                 .catch(error => Observable.throw(error));

    }

    getVideo(link: string, company: string): string {
        return this._baseURL + `api/FileService/GetFile?link=${link}&folder=videos&company=${company}`;
    }

    getImage(link: string, company: string): string {
        return this._baseURL + `api/FileService/GetFile?link=${link}&folder=images&company=${company}`;
    }
}