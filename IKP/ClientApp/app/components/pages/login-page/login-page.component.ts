import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRole } from '../../../services/models/main.model';
import { LoginService } from '../../../services/login/login.service';
import { AdminService } from '../../../services/admin/admin.service';

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

    constructor(private loginService: LoginService, private adminService: AdminService) {

    }

    performLogin() {
        this.loginService.login(this.company, this.login, this.password)
        .subscribe(u => {
            if(u != null){
                if(u.Role == UserRole.Admin) {
                    this.adminService.getAdmins(this.company)
                    .map(admins => admins.filter(x => x.ID == u.ID))
                    .subscribe(y => {
                        if(y.length > 0)
                            this.onLoginSuccess.next(y[0]);
                    });
                }
                else {
                    this.onLoginSuccess.next(u);
                }
            }
            else {
                this.showError = true;
                Observable.timer(5000).subscribe(() => { this.showError = false; });
            }
        });
    }
}
