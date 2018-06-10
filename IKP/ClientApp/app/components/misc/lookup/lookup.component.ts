import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../pages/main-page/main-page.component';
import { UserRole, User } from '../../../services/models/main.model';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
    selector: 'lookup',
    templateUrl: './lookup.component.html',
    styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {
    @Input() company: string;
    @Input() type: string;
    @Input() displayProperty: string;
    @Output() onOptionSelected: EventEmitter<any> = new EventEmitter<any>();

    list: any[];

    selectedIndex: number;

    constructor(private adminService: AdminService) { }

    ngOnInit() {
        switch(this.type){
            case 'Stuff':
                this.adminService.getStuff(this.company).subscribe(x => this.list = x);
                break;
            case 'LicenseKey':
                this.adminService.getLicenseKeys(this.company).subscribe(x => this.list = x);
                break;
        }
    }

    onSelected(){
        this.onOptionSelected.next(this.list[this.selectedIndex]);
    }
}