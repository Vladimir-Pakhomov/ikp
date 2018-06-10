import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../../pages/main-page/main-page.component';
import { Exersize } from '../../../../services/models/main.model';

@Component({
    selector: 'exersize-form',
    templateUrl: './exersize-form.component.html',
    styleUrls: ['./exersize-form.component.css']
})
export class ExersizeFormComponent implements OnInit {
    @Input() company: string;
    @Input() parentID: number;

    @Output() onFormCompleted: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFormCancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() exersize: Exersize;

    editMode: boolean;

    get valid(): boolean {
        return !!this.exersize.Name && !!this.exersize.GeneralQuestion;
    }

    ngOnInit() {
        this.editMode = this.exersize != null;
        if(!this.editMode){
            this.exersize = new Exersize();
        }
    }

    ok() {
        this.onFormCompleted.next({ parentID: this.parentID, Exersize: this.exersize });
    }

    cancel() {
        this.onFormCancelled.next();
    }
}