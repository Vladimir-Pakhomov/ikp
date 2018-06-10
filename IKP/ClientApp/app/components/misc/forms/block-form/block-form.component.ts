import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MainModule } from '../../../pages/main-page/main-page.component';
import { Block } from '../../../../services/models/main.model';

@Component({
    selector: 'block-form',
    templateUrl: './block-form.component.html',
    styleUrls: ['./block-form.component.css']
})
export class BlockFormComponent implements OnInit {
    @Input() company: string;
    @Input() parentID: number;

    @Output() onFormCompleted: EventEmitter<any> = new EventEmitter<any>();
    @Output() onFormCancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() block: Block;

    editMode: boolean;

    get valid(): boolean {
        return !!this.block.Name;
    }

    ngOnInit() {
        this.editMode = this.block != null;
        if(!this.editMode){
            this.block = new Block();
        }
    }

    ok() {
        this.onFormCompleted.next({ parentID: this.parentID, Block: this.block });
    }

    cancel() {
        this.onFormCancelled.next();
    }
}