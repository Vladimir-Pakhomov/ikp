import { Injectable, Inject } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class PendingInterceptorService {

    onRequestStarted: Subject<boolean> = new Subject<boolean>();
    onRequestFinished: Subject<boolean> = new Subject<boolean>();

    constructor(private http: Http){

    }

    get(url: string): Observable<any>{
        this.onRequestStarted.next(true);
        return this.http.get(url).map(result => {
            this.onRequestFinished.next(true);
            return result;
        });
    }

    post(url: string, body: any): Observable<any> {
        this.onRequestStarted.next(true);
        return this.http.post(url, body).map(result => {
            this.onRequestFinished.next(true);
            return result;
        });
    }
}
