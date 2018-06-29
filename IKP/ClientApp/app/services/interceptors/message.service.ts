import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MessageService {

    onAns: Subject<boolean> = new Subject<boolean>();

    constructor(){

    }

    notify(message: string){
        window.alert(message);
    }

    ask(message: string){
        let ans = window.confirm(message);
        this.onAns.next(ans);
    }
}
