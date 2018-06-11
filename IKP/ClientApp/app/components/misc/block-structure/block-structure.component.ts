import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Block, Exersize, BlockKeyMap, ExersizeKeyMap, Program } from '../../../services/models/main.model';
import { AdminService } from '../../../services/admin/admin.service';
import { checkProgram } from '../pipes/object.pipe';

@Component({
    selector: 'block-structure',
    templateUrl: './block-structure.component.html',
    styleUrls: ['./block-structure.component.css']
})
export class BlockStructureComponent implements OnInit, OnChanges {
    @Input() company: string;
    @Input() block: Block;

    @Output() onAddBlock: EventEmitter<any> = new EventEmitter<any>();
    @Output() onAddExersize: EventEmitter<any> = new EventEmitter<any>();

    @Output() onViewDescendantBlock: EventEmitter<any> = new EventEmitter<any>();
    @Output() onViewDescendantExersize: EventEmitter<any> = new EventEmitter<any>();

    descendantBlocks: Block[] = [];
    blocksKeyMap = BlockKeyMap;

    descendantExersizes: Exersize[] = [];
    exersizesKeyMap = ExersizeKeyMap;

    blockExtraActions = [{ key: 'viewBlockStructure', value: 'Структура...' }];
    exersizeExtraActions = [{ key: 'viewQuestions', value: 'Состав упражнения..' }];

    constructor(private adminService: AdminService){

    }

    ngOnInit() {
        
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.block) {
            let parentType = checkProgram(this.block) ? 0 : 1;
            this.adminService.getDescendants(this.block.ID, parentType, 1, this.company)
            .subscribe((x) => this.descendantBlocks = x);
            this.adminService.getDescendants(this.block.ID, parentType, 2, this.company)
            .subscribe((x) => this.descendantExersizes = x);
        }
    }

    addDescBlock(){
        this.onAddBlock.next(this.block);
    }

    addDescExersize(){
        this.onAddExersize.next(this.block);
    }

    onExtraAction(event: any) {
        switch(event.key){
            case 'viewBlockStructure':
                this.onViewDescendantBlock.next(event.data);
                break;
            case 'viewQuestions':
                this.onViewDescendantExersize.next(event.data);
                break;
        }
    }
}