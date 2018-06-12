import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exersize, Question, QuestionKeyMap, Conclusion, ConclusionKeyMap } from '../../../../services/models/main.model';
import { AdminService } from '../../../../services/admin/admin.service';

@Component({
    selector: 'exersize-structure',
    templateUrl: './exersize-structure.component.html',
    styleUrls: ['./exersize-structure.component.css']
})
export class ExersizeStructureComponent implements OnInit {
    @Input() company: string;
    @Input() exersize: Exersize;

    @Output() onAddQuestion: EventEmitter<any> = new EventEmitter<any>();
    @Output() onAddConclusion: EventEmitter<any> = new EventEmitter<any>();

    @Output() onViewQuestionResolvers: EventEmitter<any> = new EventEmitter<any>();
    @Output() onViewConclusionStructure: EventEmitter<any> = new EventEmitter<any>();

    @Output() onBack: EventEmitter<any> = new EventEmitter<any>();

    descendantQuestions: Question[] = [];
    questionsKeyMap = QuestionKeyMap;

    descendantConclusions: Exersize[] = [];
    conclusionsKeyMap = ConclusionKeyMap;

    questionExtraActions = [{ key: 'viewQuestionResolvers', value: 'Материалы...' }];
    conclusionExtraActions = [{ key: 'viewConclusionStructure', value: 'Структура...' }];

    constructor(private adminService: AdminService){
        
    }

    ngOnInit() {
        this.adminService.getDescendants(this.exersize.ID, 2, 3, this.company)
        .subscribe((x) => this.descendantQuestions = x);

        this.adminService.getDescendants(this.exersize.ID, 2, 6, this.company)
        .subscribe((x) => this.descendantConclusions = x);
    }

    addQuestion() {
        this.onAddQuestion.next();
    }

    addConclusion() {
        this.onAddConclusion.next();
    }

    onExtraAction(event: any){
        switch(event.key){
            case 'viewQuestionResolvers':
                this.onViewQuestionResolvers.next(event.data);
                break;
            case 'viewConclusionStructure':
                this.onViewConclusionStructure.next(event.data);
                break;
        }
    }

    back() {
        this.onBack.next();
    }
}