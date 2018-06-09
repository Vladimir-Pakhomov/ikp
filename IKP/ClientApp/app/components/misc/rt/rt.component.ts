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
    @Input() level: any[] = [
        {
            Name: 'Root',
            Children: [
                {
                    Name: 'Node1',
                    Children: []
                },
                {
                    Name: 'Node2',
                    Children: []
                },
                {
                    Name: 'Node3',
                    Children: []
                }
            ]
        }
    ];

    constructor() { }

    ngOnInit() {

    }
}