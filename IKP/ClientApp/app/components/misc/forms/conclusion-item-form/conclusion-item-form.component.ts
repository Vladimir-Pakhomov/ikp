import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../../pages/main-page/main-page.component';
import { ConclusionItem } from '../../../../services/models/main.model';

@Component({
    selector: 'conclusion-item-form',
    templateUrl: './conclusion-item-form.component.html',
    styleUrls: ['./conclusion-item-form.component.css']
})
export class ConclusionItemFormComponent implements OnInit {
    @Input() parentID: number;

    @Output() onFormCompleted: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFormCancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() conclusionItem: ConclusionItem;

    editMode: boolean;

    playbackTypeSelectedIndex: number;

    get isBranchChecked(): boolean {
        return this.conclusionItem.IsBranch;
    }

    set isBranchChecked(value: boolean) {
        this.conclusionItem.IsBranch = value;
    }

    get isCorrectChecked(): boolean {
        return this.conclusionItem.IsCorrect;
    }

    set isCorrectChecked(value: boolean) {
        this.conclusionItem.IsCorrect = value;
    }

    get valid(): boolean {
        return !!this.conclusionItem.Content;
    }

    ngOnInit() {
        this.editMode = this.conclusionItem != null;
        if(!this.conclusionItem){
            this.conclusionItem = new ConclusionItem();
            this.conclusionItem.IsBranch = false;
            this.conclusionItem.IsCorrect = false;
        }
    }

    ok() {
        this.onFormCompleted.next({ parentID: this.parentID, ConclusionItem: this.conclusionItem });
    }

    cancel() {
        this.onFormCancelled.next();
    }
}