import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../services/models/main.model';
import { LoginService } from '../../../services/login/login.service';
import { PendingInterceptorService } from '../../../services/interceptors/pending-interceptor.service';

@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

    showLoader: boolean = false;

    constructor(public interceptor: PendingInterceptorService) {

    }

    ngOnInit() {
        this.interceptor.onRequestStarted.subscribe(() => this.showLoader = true);
        this.interceptor.onRequestFinished.subscribe(() => this.showLoader = false);
    }
}
