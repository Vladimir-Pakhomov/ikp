import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../../pages/main-page/main-page.component';
import { Question } from '../../../../services/models/main.model';

@Component({
    selector: 'question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
    @Input() parentID: number;

    @Output() onFormCompleted: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFormCancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() question: Question;

    editMode: boolean;

    get valid(): boolean {
        return !!this.question.Content;
    }

    ngOnInit() {
        this.editMode = this.question != null;
        if(!this.editMode){
            this.question = new Question();
        }
    }

    ok() {
        this.onFormCompleted.next({ parentID: this.parentID, Question: this.question });
    }

    cancel() {
        this.onFormCancelled.next();
    }
}