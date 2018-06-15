import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../../pages/main-page/main-page.component';
import { Group } from '../../../../services/models/main.model';

@Component({
    selector: 'group-form',
    templateUrl: './group-form.component.html',
    styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {
    @Input() company: string;
    
    @Output() onFormCompleted: EventEmitter<Group> = new EventEmitter<Group>();
    @Output() onFormCancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() group: Group;

    editMode: boolean;

    get valid(): boolean {
        return this.group && !!this.group.Name && !!this.group.Lead;
    }

    ngOnInit() {
        this.editMode = this.group != null;
        if(!this.editMode){
            this.group = new Group();
        }
    }
    leadSelected(data: any){
        this.group.Lead = data;
    }

    ok() {
        this.onFormCompleted.next(this.group);
    }

    cancel() {
        this.onFormCancelled.next();
    }
}