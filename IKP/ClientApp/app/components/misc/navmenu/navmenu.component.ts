import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../pages/main-page/main-page.component';
import { UserRole } from '../../../services/models/main.model';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {
    @Input() role: UserRole;
    @Output() onSelected = new EventEmitter<MainModule>();

    myRole: string;

    ngOnInit() {
        this.myRole = UserRole[this.role];
    }

    fire(module: MainModule) {
        this.onSelected.next(module);
    }
}
