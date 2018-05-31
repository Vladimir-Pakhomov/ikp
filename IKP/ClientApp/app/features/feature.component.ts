import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRole } from '../services/models/main.model';

@Component({
    selector: 'feature',
    templateUrl: './feature.component.html',
    styleUrls: ['./feature.component.css']
})
export class FeatureComponent {
    currentStep: FeatureStep = 'Login';
    currentUser: User;

    ngOnInit() {

    }

    loginSuccess(u: User) {
        this.currentUser = u;
        this.currentStep = 'Main';
    }
}

export type FeatureStep = 'Login' | 'Main';