import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { PendingInterceptorService } from '../interceptors/pending-interceptor.service';

@Injectable()
export class FileService {

    _baseURL: string;
    constructor(private http: PendingInterceptorService, @Inject('BASE_URL') baseUrl: string) {
        this._baseURL = baseUrl;
    }

    upload(formData: FormData): Observable<any>{
        return this.http.post(this._baseURL + 'api/FileService/UploadFile', formData);
    }

    getVideo(link: string, company: string): string {
        return this._baseURL + `api/FileService/GetFile?link=${link}&folder=videos&company=${company}`;
    }

    getAction(){
        return this._baseURL + `api/FileService/UploadFile`;
    }

    getImage(link: string, company: string): string {
        return this._baseURL + `api/FileService/GetFile?link=${link}&folder=images&company=${company}`;
    }

    getVideos(company: string): Observable<string[]> {
        return this.http.get(
            this._baseURL + `api/FileService/GetFiles?folder=videos&company=${company}`)
            .map(response => response.json());
    }

    getImages(company: string): Observable<string[]> {
        return this.http.get(
            this._baseURL + `api/FileService/GetFiles?folder=images&company=${company}`)
            .map(response => response.json());
    }
}