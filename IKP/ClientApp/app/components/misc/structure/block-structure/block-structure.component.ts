import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Block, Exersize, ExersizeKeyMap, Program, UserRole, NamedObjectKeyMap } from '../../../../services/models/main.model';
import { AdminService } from '../../../../services/admin/admin.service';
import { checkProgram } from '../../pipes/object.pipe';

@Component({
    selector: 'block-structure',
    templateUrl: './block-structure.component.html',
    styleUrls: ['./block-structure.component.css']
})
export class BlockStructureComponent implements OnInit, OnChanges {
    @Input() role: UserRole;
    @Input() company: string;
    @Input() block: Block;

    @Output() onAddBlock: EventEmitter<any> = new EventEmitter<any>();
    @Output() onAddExersize: EventEmitter<any> = new EventEmitter<any>();

    @Output() onViewDescendantBlock: EventEmitter<any> = new EventEmitter<any>();
    @Output() onViewDescendantExersize: EventEmitter<any> = new EventEmitter<any>();
    @Output() onStartExecution: EventEmitter<any> = new EventEmitter<any>();

    @Output() onBack: EventEmitter<any> = new EventEmitter<any>();
    @Output() onEditBlock: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDeleteBlock: EventEmitter<any> = new EventEmitter<any>();
    @Output() onEditExersize: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDeleteExersize: EventEmitter<any> = new EventEmitter<any>();

    descendantBlocks: Block[] = [];
    blocksKeyMap = NamedObjectKeyMap;

    descendantExersizes: Exersize[] = [];
    exersizesKeyMap = ExersizeKeyMap;

    blockExtraActions: any; 

    exersizeExtraActions: any[] = [];

    topActions: any[] = [];

    constructor(private adminService: AdminService){

    }

    ngOnInit() {
        this.blockExtraActions = [{ key: 'viewBlockStructure', value: 'Структура...' }];
        this.exersizeExtraActions = this.role == 0 ? [{ key: 'viewQuestions', value: 'Состав упражнения..' }] : [];
        this.topActions = this.role == 2 ? [{ key: 'startBlockExecution', value: 'Начать выполнение!' }] : [];
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
            case 'startBlockExecution':
                this.onStartExecution.next(event.data);
                break;
        }
    }

    onTopAction(event: any) {
        switch(event){
            case 'startBlockExecution':
                this.onStartExecution.next(this.block);
                break;
        }
    }

    back() {
        this.onBack.next();
    }

    editDescBlock(data: any){
        this.onEditBlock.next(data);
    }

    editDescExersize(data: any){
        this.onEditExersize.next(data);
    }

    deleteDescBlock(data: any){
        this.onDeleteBlock.next(data);
    }

    deleteDescExersize(data: any){
        this.onDeleteExersize.next(data);
    }
}