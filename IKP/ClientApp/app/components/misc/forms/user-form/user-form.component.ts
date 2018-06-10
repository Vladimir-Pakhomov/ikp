import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../../pages/main-page/main-page.component';
import { UserRole, User } from '../../../../services/models/main.model';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    @Input() role: UserRole;
    @Output() onFormCompleted: EventEmitter<User> = new EventEmitter<User>();
    @Output() onFormCancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() user: User;

    editMode: boolean;

    get valid(): boolean {
        return this.user && !!this.user.FIO && !!this.user.Login && !!this.user.Password;
    }

    ngOnInit() {
        this.editMode = this.user != null;
        if(!this.user) {
            this.user = new User();
            this.user.Role = this.role;
        }
    }

    ok() {
        this.onFormCompleted.next(this.user);
    }

    cancel() {
        this.onFormCancelled.next();
    }
}