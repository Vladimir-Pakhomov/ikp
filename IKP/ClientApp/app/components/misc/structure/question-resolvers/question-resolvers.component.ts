import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question, Resolver, ResolverKeyMap } from '../../../../services/models/main.model';
import { AdminService } from '../../../../services/admin/admin.service';

@Component({
    selector: 'question-resolvers',
    templateUrl: './question-resolvers.component.html',
    styleUrls: ['./question-resolvers.component.css']
})
export class QuestionResolversComponent implements OnInit {
    @Input() company: string;
    @Input() question: Question;

    @Output() onAddResolver: EventEmitter<any> = new EventEmitter<any>();

    @Output() onViewResolverVideos: EventEmitter<any> = new EventEmitter<any>();

    @Output() onBack: EventEmitter<any> = new EventEmitter<any>();

    descendantResolvers: Resolver[] = [];
    resolversKeyMap = ResolverKeyMap;

    resolverExtraActions = [{ key: 'viewResolverVideos', value: 'Видео...' }];

    constructor(private adminService: AdminService){
        
    }

    ngOnInit() {
        this.adminService.getDescendants(this.question.ID, 3, 4, this.company)
        .subscribe((x) => this.descendantResolvers = x);
    }

    addResolver() {
        this.onAddResolver.next();
    }

    onExtraAction(event: any){
        switch(event.key){
            case 'viewResolverVideos':
                this.onViewResolverVideos.next(event.data);
                break;
        }
    }

    back() {
        this.onBack.next();
    }
}