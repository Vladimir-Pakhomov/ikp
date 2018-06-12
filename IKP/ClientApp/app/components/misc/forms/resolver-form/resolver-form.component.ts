import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../../pages/main-page/main-page.component';
import { Resolver } from '../../../../services/models/main.model';

@Component({
    selector: 'resolver-form',
    templateUrl: './resolver-form.component.html',
    styleUrls: ['./resolver-form.component.css']
})
export class ResolverFormComponent implements OnInit {
    @Input() parentID: number;

    @Output() onFormCompleted: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFormCancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() resolver: Resolver;

    editMode: boolean;
    get checked() {
        return this.resolver.Type == 1;
    }
    set checked(value: any){
        this.resolver.Content = '';
        if(value)
            this.resolver.Type = 1;
        else
            this.resolver.Type = 0;
    }

    get valid(): boolean {
        return !!this.resolver.Content;
    }

    ngOnInit() {
        this.editMode = this.resolver != null;
        if(!this.editMode){
            this.resolver = new Resolver();
            this.resolver.Type = 0;
        }
    }

    ok() {
        this.onFormCompleted.next({ parentID: this.parentID, Resolver: this.resolver });
    }

    cancel() {
        this.onFormCancelled.next();
    }
}