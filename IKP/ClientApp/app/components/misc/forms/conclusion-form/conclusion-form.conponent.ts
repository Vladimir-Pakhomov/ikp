import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../../pages/main-page/main-page.component';
import { Conclusion } from '../../../../services/models/main.model';

@Component({
    selector: 'conclusion-form',
    templateUrl: './conclusion-form.component.html',
    styleUrls: ['./conclusion-form.component.css']
})
export class ConclusionFormComponent implements OnInit {
    @Input() parentID: number;

    @Output() onFormCompleted: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFormCancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() conclusion: Conclusion;

    editMode: boolean;

    get valid(): boolean {
        return !!this.conclusion.Name;
    }

    ngOnInit() {
        this.editMode = this.conclusion != null;
        if(!this.editMode){
            this.conclusion = new Conclusion();
        }
    }

    ok() {
        this.onFormCompleted.next({ parentID: this.parentID, Conclusion: this.conclusion });
    }

    cancel() {
        this.onFormCancelled.next();
    }
}