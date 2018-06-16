import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../services/models/main.model';
import { LoginService } from '../../../services/login/login.service';

@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
    company: string = 'ikp';
    login: string;
    password: string;

    showError: boolean;

    @Output() onLoginSuccess = new EventEmitter<User>();

    constructor(private loginService: LoginService) {

    }

    performLogin() {
        this.loginService.login(this.company, this.login, this.password)
        .subscribe(u => {
            if(u != null)
                this.onLoginSuccess.next(u);
            else {
                this.showError = true;
                Observable.timer(5000).subscribe(() => { this.showError = false; });
            }
        });
    }
}
