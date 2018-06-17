import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../pages/main-page/main-page.component';
import { UserRole, User } from '../../../services/models/main.model';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
    selector: 'rt',
    templateUrl: './rt.component.html',
    styleUrls: ['./rt.component.css']
})
export class RtComponent implements OnInit {
    @Input() level: any[];
    @Input() displayProperty: string = 'Name';
    @Input() childrenProperty: string = 'Children';
    @Input() isExpanded: boolean = false;
    @Input() correctnessProperty: string = 'IsCorrect';

    @Output() onItemSelected: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
        
    }

    itemSelected(item: any){
        this.onItemSelected.next(item);
    }

    isDisplayNotNeeded(item: any): boolean{
        // Display not needed if item is incorrect and all its correct brothers are already succeeded
        return !item[this.correctnessProperty] &&
         this.level.filter((x: any) => !!x[this.correctnessProperty] && !x.isSuccess).length == 0;
    }
}