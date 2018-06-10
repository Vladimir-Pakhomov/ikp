import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exersize, Question, QuestionKeyMap, Conclusion, ConclusionKeyMap } from '../../../services/models/main.model';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
    selector: 'exersize-structure',
    templateUrl: './exersize-structure.component.html',
    styleUrls: ['./exersize-structure.component.css']
})
export class ExersizeStructureComponent implements OnInit {
    @Input() company: string;
    @Input() exersize: Exersize;

    descendantQuestions: Question[] = [];
    questionsKeyMap = QuestionKeyMap;

    descendantConclusions: Exersize[] = [];
    conclusionsKeyMap = ConclusionKeyMap;

    constructor(private adminService: AdminService){
        
    }

    ngOnInit() {
        this.adminService.getDescendants(this.exersize.ID, 2, 3, this.company)
        .subscribe((x) => this.descendantQuestions = x);

        this.adminService.getDescendants(this.exersize.ID, 2, 6, this.company)
        .subscribe((x) => this.descendantConclusions = x);
    }
}